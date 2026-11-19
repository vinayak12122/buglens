from __future__ import annotations

import re
from dataclasses import dataclass,field
from pathlib import Path

MAX_CHARS = 1500
TARGET_CHARS = 600

HEADERS_RE = re.compile(r"^(#{1,6})\s+(.*\S)\s*$")
FENCE_RE = re.compile(r"^\s*(```|~~~)")

@dataclass
class Chunk:
    chunk_id:str
    text:str
    embed_text:str
    source:str
    domain:str
    topic:str
    header_path:str
    headers:list[str] = field(default_factory=list)

def _split_into_sections(md:str) -> list[tuple[list[str],str]]:
    sections: list[tuple[list[str],str]] = []
    stack:list[tuple[int,str]] = []
    buf:list[str] = []
    in_fence = False

    def flush() -> None:
        body = "\n".join(buf).strip()
        if body:
            sections.append(([t for _,t in stack],body))
        buf.clear()

    for line in md.splitlines():
        if FENCE_RE.match(line):
            in_fence = not in_fence
            buf.append(line)
            continue

        m = None if in_fence else HEADERS_RE.match(line)
        if m:
            flush()
            level,title = len(m.group(1)),m.group(2)
            while stack and stack[-1][0] >= level:
                stack.pop()
            stack.append((level,title))
        else:
            buf.append(line)
    flush()
    return sections

def _pack_blocks(text:str,target:int,hard_max:int) -> list[str]:
    blocks:list[str] = []
    cur:list[str] = []
    in_fence = False
    for line in text.splitlines():
        if FENCE_RE.match(line):
            in_fence = not in_fence
        cur.append(line)
        if not in_fence and line.strip() == "":
            blocks.append("\n".join(cur).strip())
            cur = []

    if cur:
        blocks.append("\n".join(cur).strip())

    blocks = [b for b in blocks if b]

    glued :list[str] = []
    i = 0
    while i < len(blocks):
        b = blocks[i]
        while b.rstrip().endswith(":") and i + 1 < len(blocks):
            i += 1
            b = f"{b}\n{blocks[i]}"

        glued.append(b)
        i += 1

    safe :list[str] = []
    for b in glued:
        if len(b) <= hard_max:
            safe.append(b)
            continue
        part = ""
        for line in b.splitlines():
            if part and len(part) + len(line) + 1 > hard_max:
                safe.append(part)
                part = line
            else:
                part = f"{part}\n{line}" if part else line
        if part:
            safe.append(part)


    pieces:list[str] = []
    current = ""
    for b in safe:
        if current and len(current) + len(b) + 2 > target:
            pieces.append(current)
            current = b
        else:
            current = f"{current}\n\n{b}" if current else b
    if current:
        pieces.append(current)

    MIN_CHARS = 150
    if (len(pieces) > 1 and len(pieces[-1]) < MIN_CHARS and len(pieces[-2]) + len(pieces[-1]) + 2 <= hard_max):
        pieces[-2] = f"{pieces[-2]}\n\n{pieces[-1]}"
        pieces.pop()

    return pieces


def chunk_markdown_file(path:Path,root:Path) -> list[Chunk]:
    rel = path.relative_to(root)
    domain = rel.parts[0] if len(rel.parts) > 1 else "root"
    topic = path.stem
    source = rel.as_posix()

    md = path.read_text(encoding="utf-8")
    chunks :list[Chunk] = []

    for headers,body in _split_into_sections(md):
        header_path = " > ".join([domain,*headers]) if headers else domain
        for piece in _pack_blocks(body,TARGET_CHARS,MAX_CHARS):
            idx = len(chunks)
            chunks.append(
                Chunk(
                    chunk_id=f"{source}#{idx}",
                    text=piece,
                    embed_text=f"{header_path}\n\n{piece}",
                    source=source,
                    domain=domain,
                    topic=topic,
                    header_path=header_path,
                    headers=headers,
                )
            )

    return chunks

def chunk_directory(root: str | Path) -> list[Chunk]:
    root = Path(root)
    all_chunks: list[Chunk] = []
    for path in sorted(root.rglob("*.md")):
        all_chunks.extend(chunk_markdown_file(path, root))
    return all_chunks
