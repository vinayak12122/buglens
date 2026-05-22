import jwt
import uuid6
from typing import List,Dict
from sqlalchemy import func,desc
from sqlalchemy.orm import Session
from fastapi import APIRouter,Depends,HTTPException,WebSocket,WebSocketDisconnect

from database.connection import get_db
from database.models import Project,Issue,Log
from api.utils.dependency import get_current_user
from api.utils.project_security import generate_public_key
from api.schemas.validator import ProjectCreate,IssueStatusUpdate
from api.utils.security import JWT_SEC,JWT_ALGO


router = APIRouter(prefix='/project')

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, project_id: str, websocket: WebSocket):
        await websocket.accept()

        if project_id not in self.active_connections:
            self.active_connections[project_id] = []

        self.active_connections[project_id].append(websocket)

    def disconnect(self, project_id: str, websocket: WebSocket):
        if project_id in self.active_connections:
            if websocket in self.active_connections[project_id]:
                self.active_connections[project_id].remove(websocket)

            # cleanup empty lists
            if not self.active_connections[project_id]:
                del self.active_connections[project_id]

    async def broadcast(self, project_id: str, message: dict):
        if project_id not in self.active_connections:
            return

        dead_connections = []

        for connection in self.active_connections[project_id]:
            try:
                await connection.send_json(message)
            except Exception:
                dead_connections.append(connection)

        for conn in dead_connections:
            self.disconnect(project_id, conn)

manager = ConnectionManager()

@router.post("/create")
async def create_project(data:ProjectCreate,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    name = data.name
    website_url = data.website_url

    if not name:
        raise HTTPException(400, "Project name required")
    
    existing_project = (
        db.query(Project).filter(
            Project.user_id == current_user.id,
            func.lower(Project.name) == name.lower()
        ).first()
    )

    if existing_project:
        raise HTTPException(
            status_code=400,
            detail="Project name already exists"
        )
    
    project_id = "proj_" + uuid6.uuid7().hex[:12]
    public_key = await generate_public_key("live")

    project = Project(
        user_id=current_user.id,
        name=name,
        website_url=website_url,
        project_id=project_id,
        public_key=public_key
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return {
        "project_id": project.project_id,
        "public_key": project.public_key
    }

@router.get("/projects")
async def get_projects(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    issues_subquery = (
        db.query(
            Issue.project_id,
            func.count(Issue.id).label("issues_count")
        )
        .group_by(Issue.project_id)
        .subquery()
    )

    logs_subquery = (
        db.query(
            Log.project_id,
            func.count(Log.id).label("logs_count")
        )
        .group_by(Log.project_id)
        .subquery()
    )

    projects = (
        db.query(
            Project.id,
            Project.project_id,
            Project.name,
            Project.website_url,
            Project.public_key,
            Project.created_at,

            func.coalesce(
                issues_subquery.c.issues_count,
                0
            ).label("issues_count"),

            func.coalesce(
                logs_subquery.c.logs_count,
                0
            ).label("logs_count")
        )

        .outerjoin(
            issues_subquery,
            issues_subquery.c.project_id == Project.project_id
        )

        .outerjoin(
            logs_subquery,
            logs_subquery.c.project_id == Project.project_id
        )

        .filter(Project.user_id == current_user.id)

        .order_by(desc(Project.created_at))

        .all()
    )

    return [
        {
            "project_id": project.project_id,
            "name": project.name,
            "website_url": project.website_url,
            "public_key": project.public_key,
            "created_at": project.created_at,
            "issues_count": project.issues_count,
            "logs_count": project.logs_count,
        }
        for project in projects
    ]

@router.get("/{project_id}/issues")
async def get_project_issues(
    project_id:str,
    db:Session=Depends(get_db),
    current_user= Depends(get_current_user)
):
    project = db.query(Project).filter(Project.project_id == project_id,Project.user_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    issues = db.query(Issue).filter(Issue.project_id == project_id).order_by(desc(Issue.last_seen)).all()

    return [
    {
        "issue_id": str(issue.id),
        "fingerprint": issue.fingerprint,
        "title": issue.title,
        "count": issue.count,
        "status": issue.status,
        "severity": issue.severity,
        "last_seen": issue.last_seen,
        "latest_browser": issue.latest_browser,
        "latest_page": issue.latest_page,
    }
    for issue in issues
]

@router.get("/{project_id}/issues/{issue_id}/logs")
async def get_issue_logs(
    project_id: str,
    issue_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    logs = db.query(Log).filter(Log.issue_id == issue_id, Log.project_id == project_id).order_by(desc(Log.created_at)).limit(100).all()
    return logs


@router.websocket('/global/live')
async def global_live_socket(websocket: WebSocket):
    token = websocket.cookies.get('access_token')
    if not token:
        print("No token found closing the connection")
        await websocket.close(code=1008)
        return
    
    await manager.connect("global",websocket)

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect("global", websocket)

        
@router.websocket("/{project_id}/live")
async def websocket_endpoint(
    websocket: WebSocket,
    project_id: str,
    db: Session = Depends(get_db)
):

    print("WS CONNECT ATTEMPT")

    token = websocket.cookies.get("access_token")

    # print("TOKEN:", token)

    if not token:
        print("NO TOKEN")
        await websocket.close(code=1008)
        return

    try:
        payload = jwt.decode(
            token,
            JWT_SEC,
            algorithms=[JWT_ALGO]
        )

        user_id = payload.get("sub")

        # print("USER ID:", user_id)

        if not user_id:
            print("NO USER ID")
            await websocket.close(code=1008)
            return

    except Exception as e:
        print("JWT ERROR:", e)
        await websocket.close(code=1008)
        return

    project = (
        db.query(Project)
        .filter(
            Project.project_id == project_id,
            Project.user_id == user_id
        )
        .first()
    )

    # print("PROJECT:", project)

    if not project:
        print("PROJECT NOT FOUND")
        await websocket.close(code=1008)
        return

    await manager.connect(project_id, websocket)

    print("WS CONNECTED")

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect(project_id, websocket)
        print("WS DISCONNECTED")

@router.delete("/{project_id}")
async def delete_project(
    project_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.project_id == project_id,Project.user_id == current_user.id).first()
    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )
    
    db.delete(project)

    db.commit()

    return {
        "message": "Project deleted successfully"
    }


@router.patch('/{project_id}/issues/{issue_id}/status')
async def update_issue_status(project_id:str,issue_id:str,data:IssueStatusUpdate,db:Session=Depends(get_db),current_user=Depends(get_current_user)):

    issue = db.query(Issue).filter(Issue.id == issue_id,Issue.project_id == project_id).first()

    if not issue:
        raise HTTPException(
            status_code=404,
            detail="Issue not found"
        )
    
    new_status = data.status

    if issue.status == new_status:
        return {
            "message": "Status already updated",
            "status": issue.status
        }
    
    issue.status = new_status
    db.commit()

    await manager.broadcast(project_id,{
         "type": "issue_status_updated",
            "issue_id": str(issue.id),
            "status": new_status
    })


    return {
        "message": "Issue status updated successfully"
    }