from pathlib import Path

EMBED_MODEL = "BAAI/bge-small-en-v1.5"
COLLECTION = "buglens_kb"

BASE = Path(__file__).resolve().parent
KNOWLEDGE_DIR = BASE.parent / "knowledge"
QDRANT_PATH = BASE / "qdrant_data"

FASTEMBED_CACHE = str(Path(__file__).resolve().parent / "models_cache")