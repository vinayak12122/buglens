
from __future__ import annotations
import time
from dataclasses import dataclass
from qdrant_client import QdrantClient
try:
    from .config import COLLECTION, EMBED_MODEL, QDRANT_PATH, FASTEMBED_CACHE
except ImportError:
    from config import COLLECTION, EMBED_MODEL, QDRANT_PATH, FASTEMBED_CACHE

QUERY_PREFIX = "Represent this sentence for searching relevant passages: "
RERANK_MODEL = "Xenova/ms-marco-MiniLM-L-6-v2"

@dataclass
class Hit:
    chunk_id: str
    source: str
    header_path: str
    text: str
    score: float

class Retriever:
    def __init__(self):
        from fastembed import TextEmbedding
        self.embedder = TextEmbedding(model_name=EMBED_MODEL, cache_dir=FASTEMBED_CACHE)
        self.reranker = None
        self.client = QdrantClient(path=str(QDRANT_PATH))

    def _get_reranker(self):
        if self.reranker is None:
            from fastembed.rerank.cross_encoder import TextCrossEncoder
            self.reranker = TextCrossEncoder(model_name=RERANK_MODEL, cache_dir=FASTEMBED_CACHE)
        return self.reranker

    def retrieve(self, query: str, k: int = 3,
                 use_reranker: bool = False, candidates: int = 15,
                 domain: str | None = None):

        timings = {}
        t0 = time.perf_counter()

        qvec = next(iter(self.embedder.embed([QUERY_PREFIX + query]))).tolist()

        timings["embed_ms"] = (time.perf_counter() - t0) * 1000
        n_fetch = candidates if use_reranker else k

        qfilter = None
        if domain:
            from qdrant_client.models import FieldCondition, Filter, MatchValue
            qfilter = Filter(must=[
                FieldCondition(key="domain", match=MatchValue(value=domain))
            ])

        t0 = time.perf_counter()
        points = self.client.query_points(
            COLLECTION, query=qvec, limit=n_fetch, query_filter=qfilter
        ).points
        timings["search_ms"] = (time.perf_counter() - t0) * 1000

        hits = [
            Hit(p.payload["chunk_id"], p.payload["source"],
                p.payload["header_path"], p.payload["text"], p.score)
            for p in points
        ]

        if use_reranker and hits:
            t0 = time.perf_counter()
            reranker = self._get_reranker()
            docs = [f"{h.header_path}\n{h.text}" for h in hits]
            scores = list(reranker.rerank(query, docs))

            for h, s in zip(hits, scores):
                h.score = float(s)

            hits.sort(key=lambda h: h.score, reverse=True)
            hits = hits[:k]
            timings["rerank_ms"] = (time.perf_counter() - t0) * 1000

        timings["total_ms"] = sum(timings.values())
        return hits, timings

    def close(self):
        self.client.close()
