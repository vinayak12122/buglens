import os
import asyncio
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from core.buffer import flusher
from api.routes.auth import router as auth_router
from api.routes.ingest import router as ingest_router
from api.routes.projects import router as project_router

load_dotenv()

app = FastAPI()

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def background_worker():
    asyncio.create_task(flusher())

app.include_router(auth_router)
app.include_router(ingest_router)
app.include_router(project_router)

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "service": "BugLens Core",
        "documentation": "/docs"
    }

@app.get('/health')
def health():
    return {
        "status": "alive"
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)