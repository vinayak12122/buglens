from __future__ import annotations

import re
from collections import defaultdict
from dataclasses import dataclass

from .tree_loader import TreeLoader


@dataclass(frozen=True)
class MatchResult:
    node_id: str
    score: float

class MetadataMatcher:
    STOP_WORDS = { "the", "a", "an", "and", "or", "to", "of", "for", "in", "on", "at", "is", "are", "was", "were", "how", "what", "when", "why", "does", "do", "can", "could", "would", "should",
    }

    def __init__(self,loader:TreeLoader):
        self.loader = loader
        
    def match(self,question:str,top_k:int=10) -> list[MatchResult]:

        terms = self._extract_terms(question)
        scores = defaultdict(float)

        for node in self.loader.get_all_nodes().values():
            score = self._score_node(node,terms)

            if score > 0:
                scores[node.id] = score

        results = [
            MatchResult(node_id=node_id,score=score) for node_id,score in scores.items()
        ] 

        results.sort(
            key=lambda x:x.score,
            reverse=True
        )

        return results[:top_k]
    
    def _extract_terms(self,text:str) -> list[str]:
        text = text.lower()

        words = re.findall(r"[a-z0-9_]+",text)

        return [word for word in words if word not in self.STOP_WORDS]
    
    def _score_node(self,node,terms:list[str]) -> float:
        score = 0.0

        summary = node.summary.lower()

        keywords = [
            k.lower() for k in node.keywords
        ]

        for term in terms:
            for keyword in keywords:
                if term == keyword:
                    score += 5
                elif term in keyword:
                    score += 3

            if term in summary:
                score += 1
        
        return score