import os
import jwt
from typing import Optional
from datetime import datetime,timedelta,timezone
from passlib.context import CryptContext

JWT_SEC = os.getenv("JWT_SECRET")
JWT_ALGO = "HS256"
ACCESS_TOKEN_EXP = 60 * 24

pwd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")

def hash_password(password:str) -> str:
    return pwd_context.hash(password)

def verify_pass(plain_password:str,hash_password:str) -> bool:
    return pwd_context.verify(plain_password,hash_password)

def create_access_token(data:dict,expires_delta:Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc)+ expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXP)
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode,JWT_SEC,algorithm=JWT_ALGO)


# ====================================================================

