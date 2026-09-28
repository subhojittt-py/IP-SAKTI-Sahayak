import os
import chromadb
from chromadb.utils import embedding_functions

# Vector database er persist folder path
DB_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../vector_db"))

client = chromadb.PersistentClient(path=DB_DIR)

# Default embedding model (sentence-transformers)
embed_fn = embedding_functions.DefaultEmbeddingFunction()
collection = client.get_or_create_collection(name="legal_docs", embedding_function=embed_fn)

def retrieve_relevant_chunks(query: str, top_k: int = 5, jurisdiction: str = "India"):
    where_filter = {}
    if jurisdiction:
        where_filter = {"jurisdiction": jurisdiction}

    results = collection.query(
        query_texts=[query],
        n_results=top_k,
        where=where_filter if where_filter else None
    )

    chunks = []
    if results and results.get("documents") and len(results["documents"]) > 0:
        docs = results["documents"][0]
        metadatas = results["metadatas"][0] if results.get("metadatas") else [{}] * len(docs)
        
        for doc, meta in zip(docs, metadatas):
            chunks.append({
                "text": doc,
                "metadata": meta
            })
            
    return chunks