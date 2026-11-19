from __future__ import annotations

import time
from dataclasses import dataclass

from qdrant_client import QdrantClient
from sentence_transformers import CrossEncoder,SentenceTransformer

try:
    from .indexer import COLLECTION, EMBED_MODEL, QDRANT_PATH
except ImportError:
    from indexer import COLLECTION, EMBED_MODEL, QDRANT_PATH 


QUERY_PREFIX = "Represent this sentence for searching relevant passages: "
RERANK_MODEL = "cross-encoder/ms-marco-MiniLM-L-6-v2"

@dataclass
class Hit:
    chunk_id: str
    source: str
    header_path: str
    text: str
    score: float

class Retriever:
    def __init__(self) -> None:
        self.embedder = SentenceTransformer(EMBED_MODEL,device="cpu")
        self.reranker = CrossEncoder(RERANK_MODEL,device="cpu")
        self.client = QdrantClient(path=(QDRANT_PATH))

    def retrieve(self,query:str,k:int=3,use_reranker:bool=False,candidates:int=15,domain:str|None=None) -> tuple[list[Hit],dict[str,float]]:
        timings:dict[str,float] = {}

        t0 = time.perf_counter()
        qvec = self.embedder.encode(
            QUERY_PREFIX + query,normalize_embeddings=True
        ).tolist()

        timings["embed_ms"] = (time.perf_counter() - t0) * 1000

        n_fetch = candidates if use_reranker else k

        qfilter = None
        if domain:
            from qdrant_client.models import FieldCondition,Filter,MatchValue
            qfilter = Filter(must=[FieldCondition(key="domain",match=MatchValue(value=domain))])

        t0 = time.perf_counter()

        points = self.client.query_points(
            COLLECTION,query=qvec,limit=n_fetch,query_filter=qfilter
        ).points
        timings["search_ms"] = (time.perf_counter() - t0) * 1000

        hits = [
            Hit(p.payload["chunk_id"],p.payload["source"],
                p.payload["header_path"],p.payload["text"],p.score)

                for p in points
        ]

        if use_reranker and hits:
            t0 = time.perf_counter()
            pairs = [(query,f"{h.header_path}\n{h.text}") for h in hits]
            scores = self.reranker.predict(pairs)
            for h,s in zip(hits,scores):
                h.score = float(s)
            hits.sort(key=lambda h:h.score,reverse=True)
            hits = hits[:k]
            timings["rerank_ms"] = (time.perf_counter() - t0) * 1000
        timings["total_ms"] = sum(timings.values())
        return hits,timings

    def close(self) -> None:
        self.client.close()


