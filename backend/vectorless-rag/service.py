from __future__ import annotations

from .retrieval.tree_loader import TreeLoader
from .retrieval.metadata_matcher import MetadataMatcher
from .retrieval.leaf_retriever import LeafRetriever
from .retrieval.answer_generator import AnswerGenerator

class RagService:
    def __init__(self,llm):
        self.loader = TreeLoader()

        self.matcher = MetadataMatcher(self.loader)

        self.retriever = LeafRetriever(
            self.loader
        )

        self.generator = AnswerGenerator(
            llm=llm
        )

    def ask(self,question:str,top_k:int=5) -> str:
        matches = self.matcher.match(question,top_k)

        if not matches:
            return (
                "I couldn't find any relevant "
                "information about that in "
                "the BugLens knowledge base."
            )
        
        node_ids = [
            match.node_id
            for match in matches
        ]

        docs = self.retriever.retrieve(
            node_ids
        )

        return self.generator.generate(
            question=question,
            documents=docs
        )
    
    async def stream_answer(self,question:str,top_k:int = 5):
        matches = self.matcher.match(
            question,
            top_k=top_k
        )

        if not matches:
            yield (
                "I couldn't find relevant "
                "information."
            )
            return
        
        node_ids = [
            m.node_id for m in matches
        ]

        docs = self.retriever.retrieve(
            node_ids
        )

        buffer = ''

        async for chunk in self.generator.generate(question,docs):
            buffer += chunk

            if any(x in buffer for x in [".","!","?","\n"]):
                yield buffer
                buffer = ""
            
        if buffer:
            yield buffer