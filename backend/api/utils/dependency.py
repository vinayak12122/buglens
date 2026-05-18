import jwt
from fastapi import Depends,HTTPException,status,Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database.connection import get_db
from database.models import User
from api.utils.security import JWT_SEC,JWT_ALGO


oauth2_schema = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    # 2. Manual check of the cookie
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not Authenticated"
        )
    try:
        payload = jwt.decode(token, JWT_SEC, algorithms=[JWT_ALGO])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Invalid session token"
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Session expired or invalid"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="User not found"
        )
    return user

async def verify_pre_auth_token(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("pre_auth_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid handshake"
        )
    
    try:
        payload = jwt.decode(token, JWT_SEC, algorithms=[JWT_ALGO])
        user_id: str = payload.get("sub")
        intent: str = payload.get("intent")

        if user_id is None or intent != "pre-auth":
            raise HTTPException(status_code=401, detail="Invalid handshake token")
            
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        return user
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")