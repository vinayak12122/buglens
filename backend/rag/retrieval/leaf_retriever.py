from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Dict

from .tree_loader import TreeLoader

@dataclass(frozen=True)
class RetrievedDocument:
    node_id:str
    path:str
    content:str

class LeafRetriever:
    def __init__(self,loader:TreeLoader,dir:str | Path | None = None):
        self.loader = loader
        base_dir = Path(__file__).resolve().parent.parent
        self.dir = (
            Path(dir).resolve()
            if dir 
            else base_dir / "knowledge"
        )

        self._content_cache:Dict[str,str] = {}

    def retrieve(self,node_ids:list[str]) -> list[RetrievedDocument]:
        documents = []

        for node_id in node_ids:
            node = self.loader.get_node(node_id)

            content = self._load_document(
                node.path
            )

            documents.append(
                RetrievedDocument(
                    node_id=node_id,
                    path=node.path,
                    content=content
                )
            )

        return documents
    
    def retrieve_one(self,node_id:str) -> RetrievedDocument:
        node = self.loader.get_node(node_id)

        content = self._load_document(
            node.path
        )

        return RetrievedDocument(
            node_id=node_id,
            path=node.path,
            content=content
        )
    
    def clear_cache(self) -> None:
        self._content_cache.clear()

    def cache_size(self) -> int:
        return len(self._content_cache)
    
    def _load_document(self,relative_path:str) -> str:
        if relative_path in self._content_cache:
            return self._content_cache[relative_path]
        
        file_path = (
            self.dir  / relative_path
        ).resolve()

        self._validate_path(file_path)

        try:
            content = file_path.read_text(
                encoding="utf-8"
            )

        except FileNotFoundError as e:
            raise FileNotFoundError(f"Knowledge file not found : \n{file_path}") from e
        
        self._content_cache[relative_path] = content

        return content
    
    def _validate_path(self,path:Path) -> None:
        try:
            path.relative_to(
                self.dir
            )
        except ValueError as e:
            raise ValueError(f"Invalid path : {path}")  from e