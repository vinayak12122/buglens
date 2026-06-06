from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

from rag.service import RagService
from rag.schemas.question import AskRequest
from rag.schemas.answer import AskResponse

load_dotenv()

router = APIRouter(prefix="/rag")

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_KEY")
)

rag_service = RagService(llm)

@router.post("/ask")
async def ask(
    request:AskRequest
):
    async def event_stream():
        async for chunk in (rag_service.stream_answer(request.question)):
            content = chunk.content if hasattr(chunk, "content") else str(chunk)

            if content:
                yield f"data: {content}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream"
    )
