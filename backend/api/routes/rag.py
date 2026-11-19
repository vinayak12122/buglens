
import asyncio
import os
import threading

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from langchain_groq import ChatGroq
from dotenv import load_dotenv

from rag.vector_service import VectorRagService
from rag.schemas.question import AskRequest

load_dotenv()

router = APIRouter(prefix="/rag")

llm = ChatGroq(
    model="openai/gpt-oss-120b",
    api_key=os.getenv("GROQ_KEY"),
    temperature=0
)

rag_service = None
rag_lock = threading.Lock()

def get_rag_service():
    global rag_service

    if rag_service is None:
        with rag_lock:
            if rag_service is None:
                rag_service = VectorRagService(
                    llm,
                    k=3,
                    use_reranker=False
                )

    return rag_service


@router.post("/ask")
async def ask(request: AskRequest):
    service = await asyncio.to_thread(get_rag_service)

    async def event_stream():
        async for chunk in service.stream_answer(request.question):
            if chunk:
                yield f"data: {chunk}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream"
    )
