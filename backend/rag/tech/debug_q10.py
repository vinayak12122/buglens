from chunker import chunk_directory
from indexer import KNOWLEDGE_DIR
from retriever import Retriever

QUESTION = "What are the current limitations of BugLens?"
TARGET = "product/limitations.md"

r = Retriever()
hits, _ = r.retrieve(QUESTION, k=15, use_reranker=False)   # top 15 by cosine

print(f"Q: {QUESTION}\n")
for i, h in enumerate(hits, start=1):
    mark = "   <-- RELEVANT" if h.source == TARGET else ""
    print(f"{i:2d} | {h.score:.3f} | {h.chunk_id:30s} | {h.header_path}{mark}")

if not any(h.source == TARGET for h in hits):
    print("\nlimitations.md is NOT in the top 15")

# Show exactly what text was embedded for that file
print("\n--- embedded text of limitations.md ---")
for c in chunk_directory(KNOWLEDGE_DIR):
    if c.source == TARGET:
        print(c.embed_text)

r.close()