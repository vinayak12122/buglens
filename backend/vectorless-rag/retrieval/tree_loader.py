from __future__ import annotations
 
import json
from dataclasses import dataclass
from pathlib import Path
from collections import defaultdict
from typing import Dict,Set

@dataclass(frozen=True)
class Node:
    id:str
    category: str
    document: str
    summary: str
    path: str
    keywords: tuple[str, ...]

class TreeLoader:
    REQUIRED_FILES = (
        "tree.json",
        "summaries.json",
        "metadata.json",
    )

    def __init__(self,tree_dir:str | Path | None = None):
        base_dir = Path(__file__).resolve().parent.parent

        self.tree_dir = (
            Path(tree_dir).resolve()
            if tree_dir 
            else base_dir / "tree"
        )
        self.tree:dict = {}
        self.summaries:dict = {}
        self.metadata:dict = {}

        self.nodes:Dict[str,Node] = {}

        self.keyword_index: Dict[str, Set[str]] = {}

        self.related_index : Dict[str,Set[str]] = {}

        self._load()

    def reload(self) -> None:
        self._load()

    def get_node(self,node_id:str) -> Node:
        try:
            return self.nodes[node_id]
        except KeyError as e:
            raise ValueError(f"Unknown node : {node_id}") from e
        
    def get_all_nodes(self) -> Dict[str,Node]:
        return self.nodes
    
    def get_keywords(self,node_id:str) -> tuple[str,...]:
        return self.get_node(node_id).keywords
    
    def get_related_nodes(self,node_id:str) -> list[str]:
        return sorted(self.related_index.get(node_id,set()))
    
    def find_by_keyword(self,keyword:str) -> list[str]:
        return sorted(self.keyword_index.get(keyword.lower(),set()))
    
    def search_keyword(self,words:list[str]) -> list[tuple[str,int]]:
        scores = defaultdict(int)

        for word in words:
            word = word.lower()
            
            for node_id in self.keyword_index.get(word,set()):
                scores[node_id] += 1

        return sorted(scores.items(),key=lambda x:x[1],reverse=True)
    
    def _load(self) -> None:
        self._validate_files_exist()
        self.tree = self._load_json("tree.json")
        self.summaries = self._load_json("summaries.json")
        self.metadata = self._load_json("metadata.json")

        self._validate_tree()
        self._validate_metadata()
        self._validate_cross_refs()

        self._build_node_index()
        self._build_keyword_index()
        self._build_related_index()

    def _load_json(self,file_name:str) -> dict:
        file_path = self.tree_dir / file_name

        try:
            with open(file_path,'r',encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid Json in {file_path} : {e}") from e
        
    def _validate_files_exist(self) -> None:
        missing = []
        for file_name in self.REQUIRED_FILES:
            file_path = self.tree_dir / file_name

            if not file_path.exists():
                missing.append(str(file_path))

        if missing:
            raise FileNotFoundError(
                "Missing RAG Files : \n" + "\n".join(missing)
            )
        
    def _validate_tree(self) -> None:
        if not isinstance(self.tree,dict):
            raise ValueError("tree.json must be an object")
        
        if not self.tree:
            raise ValueError(
                "tree.json cannot be empty"
            )
        
    def _validate_metadata(self) -> None:
        if not isinstance(self.metadata,dict):
            raise ValueError(
                "metadata.json must be an object"
            )
        
        if not self.metadata:
            raise ValueError(
                "metadata.json cannot be empty"
            )
        
        for node , data in self.metadata.items():
            if not isinstance(data, dict):
                raise ValueError(f"Metadata format invalid for node: {node}")
            keywords = data.get("keywords")

            if not isinstance(keywords,list):
                raise ValueError(
                    f"{node} missing keywords list"
                )
            
    def _validate_cross_refs(self) -> None:
        for node_id in self.metadata.keys():
            try:
                category,document = (
                    node_id.split(".")
                )
            except ValueError:
                raise ValueError(f"Invalid node id : {node_id}")
            
            if category not in self.summaries:
                raise ValueError(f"{category} missing from summaries")
            
            docs = self.summaries[category].get("documents",{})

            if document not in docs:
                raise ValueError(f"{node_id} missing from summaries")
            
    def _build_node_index(self) -> None:
        self.nodes.clear()

        for node_id,meta in self.metadata.items():
            category,document = (
                node_id.split(".")
            )

            doc = self.summaries[category]["documents"][document]

            self.nodes[node_id] = Node(
                id=node_id,
                category=category,
                document=document,
                summary=doc["summary"],
                path=doc["path"],
                keywords=tuple(
                    k.lower()
                    for k in meta["keywords"]
                ),
            )

    def _build_keyword_index(self) -> None:
        self.keyword_index.clear()

        index = defaultdict(set)

        for node in self.nodes.values():
            for keyword in node.keywords:
                index[keyword.lower()].add(node.id)
        self.keyword_index = dict(index)

    def _build_related_index(self) -> None:
        self.related_index.clear()

        related = defaultdict(set)

        for node in self.nodes.values():
            for keyword in node.keywords:
                for neighbor_id in self.keyword_index.get(keyword,set()):
                    if neighbor_id != node.id:
                        related[node.id].add(neighbor_id)

        self.related_index = dict(
            related
        )
    
    def stats(self) -> dict:
        return {
            "nodes": len(self.nodes),
            "keywords": len(
                self.keyword_index
            ),
            "related_nodes": len(
                self.related_index
            ),
        }



    
