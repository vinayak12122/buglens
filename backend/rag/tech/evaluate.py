from __future__ import annotations

import statistics

from eval_set import EVAL_SET
from retriever import Retriever

K_VALUES = (1, 3, 5)
MAX_K = max(K_VALUES)

def first_relevant_rank(hits, relevant_files: list[str]) -> int | None:
    for rank, h in enumerate(hits, start=1):
        if h.source in relevant_files:
            return rank
    return None

def evaluate(r:Retriever,use_reranker:bool) -> dict:
    ranks: list[int | None] = []
    latencies: list[float] = []

    for case in EVAL_SET:
        hits, timings = r.retrieve(
            case["question"], k=MAX_K, use_reranker=use_reranker, candidates=15
        )
        ranks.append(first_relevant_rank(hits, case["relevant"]))
        latencies.append(timings["total_ms"])

    n = len(ranks)
    result = {
        **{f"hit@{k}": sum(1 for x in ranks if x is not None and x <= k) / n
           for k in K_VALUES},
        "mrr": sum(1 / x for x in ranks if x is not None) / n,
        "avg_ms": statistics.mean(latencies),
        "max_ms": max(latencies),
        "ranks": ranks,
    }
    return result


if __name__ == "__main__":
    r = Retriever()
    r.retrieve("warm up", use_reranker=True)

    cosine = evaluate(r, use_reranker=False)
    rerank = evaluate(r, use_reranker=True)

    print(f"\nQuestions: {len(EVAL_SET)}\n")
    print(f"{'metric':<10} {'COSINE':>10} {'RERANK':>10}")
    for k in K_VALUES:
        print(f"{'hit@' + str(k):<10} {cosine[f'hit@{k}']:>10.2f} {rerank[f'hit@{k}']:>10.2f}")
    print(f"{'MRR':<10} {cosine['mrr']:>10.3f} {rerank['mrr']:>10.3f}")
    print(f"{'avg ms':<10} {cosine['avg_ms']:>10.0f} {rerank['avg_ms']:>10.0f}")
    print(f"{'max ms':<10} {cosine['max_ms']:>10.0f} {rerank['max_ms']:>10.0f}")

    print("\nRank of first relevant chunk per question:")
    print(f"{'#':<3} {'COS':>4} {'RR':>4}  question")
    for i, case in enumerate(EVAL_SET, start=1):
        c = cosine["ranks"][i - 1]
        rr = rerank["ranks"][i - 1]
        print(f"{i:<3} {str(c or '-'):>4} {str(rr or '-'):>4}  {case['question']}")

    r.close()