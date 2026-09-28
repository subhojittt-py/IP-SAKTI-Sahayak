import os
import io
import uuid
import chromadb
from chromadb.utils import embedding_functions
from api.rag.utils.chunking import chunk_text

# Vector database directory setup
DB_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../vector_db"))
client = chromadb.PersistentClient(path=DB_DIR)
embed_fn = embedding_functions.DefaultEmbeddingFunction()
collection = client.get_or_create_collection(name="legal_docs", embedding_function=embed_fn)

def extract_text_from_file(filename: str, content: bytes) -> str:
    """
    File format (TXT / PDF) onujayi raw text extract kore.
    """
    if filename.endswith(".txt"):
        return content.decode("utf-8", errors="ignore")
        
    elif filename.endswith(".pdf"):
        try:
            from pypdf import PdfReader
            reader = PdfReader(io.BytesIO(content))
            text = ""
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
            return text
        except ImportError:
            raise RuntimeError("PDF support-er jonno `pypdf` install thaka dorkar: pip install pypdf")
            
    return ""

def ingest_file(filename: str, content: bytes, jurisdiction: str = "India") -> str:
    """
    File process kore Vector DB-te chunk save kore.
    """
    text = extract_text_from_file(filename, content)
    if not text.strip():
        return "Empty or unreadable document"

    chunks = chunk_text(text, chunk_size=300, overlap=50)
    
    documents = []
    metadatas = []
    ids = []
    
    for idx, chunk in enumerate(chunks):
        documents.append(chunk)
        metadatas.append({
            "source": filename,
            "chunk_index": idx,
            "jurisdiction": jurisdiction
        })
        ids.append(f"{filename}_{uuid.uuid4().hex[:8]}_{idx}")

    # ChromaDB-te add kora
    collection.add(
        documents=documents,
        metadatas=metadatas,
        ids=ids
    )

    return f"Successfully indexed {len(chunks)} chunks from {filename}"