import time

from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

from indexer import COLLECTION,EMBED_MODEL,QDRANT_PATH

QUERY_PREFIX = "Represent this sentence for searching relevant passages: "

model = SentenceTransformer(EMBED_MODEL,device="cpu")
client = QdrantClient(path=str(QDRANT_PATH))

questions = [
    "How does BugLens prevent duplicate issues?",
    "Why is the queue stored on disk?",
    "How do I install the SDK?",
    "How do dashboards get live updates?",
]

for q in questions:
    t0 = time.perf_counter()
    qvec = model.encode(QUERY_PREFIX+q,normalize_embeddings=True).tolist()
    hits = client.query_points(COLLECTION,query=qvec,limit=5).points
    ms = (time.perf_counter() - t0) * 1000

    print(f"\nQ: {q} ({ms:0f} ms)")
    for h in hits:
        print(f"{h.score:.3f} | {h.payload['chunk_id']:35s} | {h.payload['header_path']}")

client.close()