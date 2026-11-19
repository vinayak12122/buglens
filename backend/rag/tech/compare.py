from retriever import Retriever

QUESTIONS = [
    "How does BugLens prevent duplicate issues?",
    "Why is the queue stored on disk?",
    "How do I install the SDK?",
    "How do dashboards get live updates?",
]

r = Retriever()
r.retrieve("warm up", use_reranker=True)   

for q in QUESTIONS:
    print(f"\nQ: {q}")
    for mode in (False, True):
        hits, t = r.retrieve(q, k=3, use_reranker=mode)
        label = "RERANK" if mode else "COSINE"
        print(f"  [{label}] {t['total_ms']:.0f} ms")
        for h in hits:
            print(f"     {h.score:7.3f} | {h.chunk_id:32s} | {h.header_path}")

r.close()
