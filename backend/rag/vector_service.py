from __future__ import annotations

import asyncio
import os
import threading

from .tech.retriever import Hit, Retriever


SYSTEM_PROMPT = """You are the BugLens documentation assistant.
Answer the user's question using ONLY the context below.
If the context does not contain the answer, say exactly: "I couldn't find that in the BugLens documentation."
Do not invent features. Keep the answer clear and concise."""

NOT_FOUND = "I couldn't find that in the BugLens documentation."


def build_context(hits: list[Hit]) -> str:
    return "\n\n".join(f"({h.header_path})\n{h.text}" for h in hits)


class VectorRagService:
    def __init__(self, llm, k: int = 3, use_reranker: bool | None = None):
        self.llm = llm
        self.k = k
        if use_reranker is None:
            use_reranker = os.getenv("RAG_USE_RERANKER", "false").lower() == "true"
        self.use_reranker = use_reranker

        self.retriever = Retriever()
        # self.retriever.retrieve("warm up", use_reranker=True)
        self._lock = threading.Lock()

    def _retrieve(self, question: str) -> list[Hit]:
        with self._lock:
            hits, _ = self.retriever.retrieve(
                question, k=self.k, use_reranker=self.use_reranker
            )
        return hits

    async def stream_answer(self, question: str):
        hits = await asyncio.to_thread(self._retrieve, question)
        if not hits:
            yield NOT_FOUND
            return

        messages = [
            ("system", f"{SYSTEM_PROMPT}\n\nContext:\n{build_context(hits)}"),
            ("human", question),
        ]
        async for chunk in self.llm.astream(messages):
            if chunk.content:
                yield chunk.content