from collections import Counter
from pathlib import Path
from chunker import chunk_directory

KNOWLEDGE_DIR = Path(__file__).resolve().parent.parent / "knowledge"
chunks = chunk_directory(KNOWLEDGE_DIR)

print(f"Total chunks: {len(chunks)}")
print("Chunks per domain:", dict(Counter(c.domain for c in chunks)))
print("Chunks per file:")
for src, n in sorted(Counter(c.source for c in chunks).items()):
    print(f"  {src}: {n}")

lengths = [len(c.text) for c in chunks]
print(f"\nChars per chunk -> min {min(lengths)}, "
      f"avg {sum(lengths) // len(lengths)}, max {max(lengths)}")

print("\nTitle vs filename check:")
for src in sorted({c.source for c in chunks}):
    first = next(c for c in chunks if c.source == src)
    title = first.headers[0] if first.headers else "(no header)"
    print(f"  {src:40s} -> '# {title}'")

print("\n--- First 5 chunks ---")
for c in chunks[:5]:
    print(f"[{c.chunk_id}] {c.header_path}  ({len(c.text)} chars)")
    print(c.text[:150].replace("\n", " "), "...\n")

tiny = [c for c in chunks if len(c.text) < 150]
print(f"{len(tiny)} tiny chunks (<150 chars):")
for c in tiny[:10]:
    print(f"  {c.chunk_id} | {c.header_path} | {c.text!r}")