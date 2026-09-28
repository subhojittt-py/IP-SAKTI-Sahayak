import os
from typing import List, Dict
import chromadb
from chromadb.utils import embedding_functions

DB_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../vector_db"))
client = chromadb.PersistentClient(path=DB_DIR)
embed_fn = embedding_functions.DefaultEmbeddingFunction()
collection = client.get_or_create_collection(name="legal_docs", embedding_function=embed_fn)

def semantic_search(query: str, top_k: int = 5) -> List[Dict]:
    """
    Direct semantic search kore document metadata ar snippet return kore.
    """
    results = collection.query(
        query_texts=[query],
        n_results=top_k
    )

    formatted_results = []
    if results and results.get("documents") and len(results["documents"]) > 0:
        docs = results["documents"][0]
        metadatas = results["metadatas"][0] if results.get("metadatas") else [{}] * len(docs)
        distances = results["distances"][0] if results.get("distances") else [0.0] * len(docs)

        for doc, meta, dist in zip(docs, metadatas, distances):
            formatted_results.append({
                "document": doc,
                "metadata": meta,
                "score": round(float(dist), 4)
            })

    return formatted_results