import time
import secrets
import hashlib
from threading import Lock
from database.connection import SessionLocal
from database.models import Project

project_cache = {}
cache_lock = Lock()
CACHE_TTL = 300

def verify_project(public_key:str):
    if not public_key:
        return None
    
    now = time.time()

    cached = project_cache.get(public_key)
    if cached and cached[1] > now:
        return cached[0]
    
    with cache_lock:
        cached = project_cache.get(public_key)
        if cached and cached[1] > now:
            return cached[0]
        
        db = SessionLocal()
        try:
            project = db.query(Project).filter(
                Project.public_key == public_key
            ).first()

            if project:
                project_cache[public_key] = (
                    project.project_id,
                    now + CACHE_TTL
                )
                return project.project_id
        finally:
            db.close()
    return None

def generate_fingerprint(message:str,stack:str=None) -> str:
    stack_line = (stack or "").splitlines()[0] if stack else ''
    signature = f'{message}|{stack_line}'
    return hashlib.sha256(signature.encode()).hexdigest()

async def generate_public_key(env:str = "live") -> str:
    prefix = "bg_live_" if env == "live" else "bg_test_"
    random_part = secrets.token_urlsafe(24)
    return prefix + random_part