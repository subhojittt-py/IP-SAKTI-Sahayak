from typing import List, Dict

def rerank_documents(query: str, docs: List[Dict], top_n: int = 3) -> List[Dict]:
    """
    Retrieved chunks ke query relevancy onujayi filter/re-rank kore.
    Cross-encoder model na thakle fallback hishabe top_n slice kore.
    """
    if not docs:
        return []
    
    # Simple top-N slice (ekhane chaile CrossEncoder model load korte paro)
    return docs[:top_n]