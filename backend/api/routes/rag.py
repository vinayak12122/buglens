
from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
import json

from rag.vector_service import VectorRagService
from rag.schemas.question import AskRequest

load_dotenv()

router = APIRouter(prefix="/rag")

llm = ChatGroq(
    model="openai/gpt-oss-120b",
    api_key=os.getenv("GROQ_KEY"),
    temperature=0
)

def initialize_rag():
    return VectorRagService(llm, k=3, use_reranker=False)

@router.post("/ask")
async def ask(request: AskRequest, req: Request):
    service = req.app.state.rag_service

    async def event_stream():
        async for chunk in service.stream_answer(request.question):
            if chunk:
                yield f"data: {json.dumps(chunk)}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")
