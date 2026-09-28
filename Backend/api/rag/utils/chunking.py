from typing import List

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
    if not text:
        return []
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        end = start + chunk_size
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        if end >= len(words):
            break
        start += (chunk_size - overlap)
    return chunks
