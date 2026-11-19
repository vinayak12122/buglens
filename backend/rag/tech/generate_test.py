from __future__ import annotations

import os
import time
from dotenv import load_dotenv
from langchain_groq import ChatGroq

from retriever import Hit,Retriever

load_dotenv()

SYSTEM_PROMPT = """You are the BugLens documentation assistant.
Answer the user's question using ONLY the context below.
If the context does not contain the answer, say: "I couldn't find that in the BugLens documentation."
Do not invent features. Keep the answer clear and concise.
Cite sources inline as [1], [2] matching the context numbers."""

def build_context(hits:list[Hit]) -> str:
    return "\n\n".join(
        f"[{i}] ({h.source} > {h.header_path})\n{h.text}"
        for i,h in enumerate(hits,start=1)
    )

def main() -> None:
    llm = ChatGroq(
        model="openai/gpt-oss-120b",
        api_key=os.getenv("GROQ_KEY"),
        temperature=0
    )

    retriever = Retriever()
    retriever.retrieve("warm up", use_reranker=True)

    questions = [
        "What is the process to get an API key in BugLens?",
        "Why does BugLens use a queue instead of processing events directly?",
        "My dashboard isn't updating, what should I check?",
        "Does BugLens support Slack alerts?",
    ]

    for q in questions:
        t0 = time.perf_counter()
        hits, timings = retriever.retrieve(q, k=3, use_reranker=True)
        retrieval_ms = (time.perf_counter() - t0) * 1000

        messages = [
            ("system", f"{SYSTEM_PROMPT}\n\nContext:\n{build_context(hits)}"),
            ("human", q),
        ]

        print(f"\n{'=' * 70}\nQ: {q}")
        print(f"Retrieval: {retrieval_ms:.0f} ms | sources: "
              + ", ".join(h.chunk_id for h in hits))
        print("A: ", end="", flush=True)

        # Stream tokens, and measure time-to-first-token (what a user feels)
        t1 = time.perf_counter()
        first_token_ms = None
        for chunk in llm.stream(messages):
            if chunk.content:
                if first_token_ms is None:
                    first_token_ms = (time.perf_counter() - t1) * 1000
                print(chunk.content, end="", flush=True)
        total_ms = (time.perf_counter() - t1) * 1000
        print(f"\n[first token: {first_token_ms:.0f} ms | generation total: {total_ms:.0f} ms]")

    retriever.close()


if __name__ == "__main__":
    main()