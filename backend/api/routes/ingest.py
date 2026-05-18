import uuid6
import logging
from fastapi import WebSocket,WebSocketDisconnect
from fastapi import APIRouter,Header,Request,HTTPException,status

from api.routes.projects import manager
from api.utils.project_security import verify_project,generate_fingerprint
from core.buffer import log_queue,processing_queue,MAX_BUFFER


logger = logging.getLogger(__name__)

router = APIRouter(prefix='/ingest')

@router.post("/collect",status_code=status.HTTP_202_ACCEPTED)
async def collect_event(
    request:Request,
    x_public_key:str = Header(None,alias='X-Public-Key')
):
    total_buffer = len(log_queue) + len(processing_queue)
    if total_buffer >= MAX_BUFFER:
        logger.warning(f"🚨 Buffer full ({total_buffer}/{MAX_BUFFER}) — rejecting")
        raise HTTPException(
            status_code=429,
            detail="Ingestion buffer full. Try again later."
        )
    
    project_id = verify_project(x_public_key)
    if not project_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API Key"
        )
    
    try:
        data = await request.json()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid JSON payload"
        )
    
    if isinstance(data, list):
        events = data
    
    elif isinstance(data, dict):
        events = data.get("events")
    
    else:
        events = None

    if not events or not isinstance(events,list):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Events array required"
        )
    
    accepted_ids = []

    for item in events:
        message = item.get("message")

        if not message:
            continue

        event = {
            "event_id": str(
                uuid6.uuid7()
            ),
            "project_id": project_id,
            "fingerprint":
                generate_fingerprint(
                    message,
                    item.get("stack")
                ),
            "type": item.get(
                "type",
                "error"
            ),
            "message": message,
            "stack": item.get(
                "stack"
            ),
            "page": item.get(
                "page"
            ),
            "browser": item.get(
                "browser"
            ),
            "payload": item.get(
                "payload",
                {}
            ),
        }
        
        log_queue.append(event)

        accepted_ids.append(event["event_id"])

    if not accepted_ids:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid events"
        )

    return {
        "status": "accepted",
        "count": len(accepted_ids),
        "ids": accepted_ids
    }
