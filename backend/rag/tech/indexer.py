from __future__ import annotations

import time
import uuid
from pathlib import Path
from qdrant_client import QdrantClient
from qdrant_client.models import Distance,PointStruct,VectorParams
from sentence_transformers import SentenceTransformer

try:
    from .chunker import chunk_directory
except ImportError:
    from chunker import chunk_directory

EMBED_MODEL = "BAAI/bge-small-en-v1.5"
COLLECTION = "buglens_kb"

BASE = Path(__file__).resolve().parent
KNOWLEDGE_DIR = BASE.parent / "knowledge"
QDRANT_PATH = BASE / "qdrant_data"

def build_index() -> None:
    chunks = chunk_directory(KNOWLEDGE_DIR)
    print(f"Chunked: {len(chunks)} chunks")
    model = SentenceTransformer(EMBED_MODEL,device="cpu")
    t0 = time.perf_counter()
    vectors = model.encode(
        [c.embed_text for c in chunks],
        batch_size=32,
        normalize_embeddings=True,
        show_progress_bar=True,
    )
    print(f"Embedded in {time.perf_counter() - t0:.1f}s")

    client = QdrantClient(path=str(QDRANT_PATH))

    if client.collection_exists(COLLECTION):
        client.delete_collection(COLLECTION)

    client.create_collection(
        collection_name=COLLECTION,
        vectors_config=VectorParams(size=vectors.shape[1],distance=Distance.COSINE),
    )

    points = [
        PointStruct(
            id=str(uuid.uuid5(uuid.NAMESPACE_URL,c.chunk_id)),
            vector=vec.tolist(),
            payload={
                "chunk_id": c.chunk_id,
                "text": c.text,
                "source": c.source,
                "domain": c.domain,
                "topic": c.topic,
                "header_path": c.header_path,
            },
        )
        for c,vec in zip(chunks,vectors)
    ]

    client.upsert(collection_name=COLLECTION, points=points)
    print(f"Indexed {client.count(COLLECTION).count} points into '{COLLECTION}'")
    client.close()

if __name__ == "__main__":
    build_index()