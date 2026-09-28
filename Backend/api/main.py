import os
import sys
from pathlib import Path

# =========================================================
# Dynamic Path Resolution
# =========================================================

CURRENT_FILE = Path(__file__).resolve()
API_DIR = CURRENT_FILE.parent
BACKEND_DIR = API_DIR.parent

for path in [str(BACKEND_DIR), str(API_DIR)]:
    if path not in sys.path:
        sys.path.insert(0, path)


# =========================================================
# Imports
# =========================================================

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any


try:
    from rag.chat import handle_chat_query
    from rag.ingestion import ingest_file
    from rag.ip_analysis import analyze_patent_ip
    from rag.search import semantic_search

except ImportError:
    from api.rag.chat import handle_chat_query
    from api.rag.ingestion import ingest_file
    from api.rag.ip_analysis import analyze_patent_ip
    from api.rag.search import semantic_search


# =========================================================
# FastAPI App
# =========================================================

app = FastAPI(
    title="IP-SAKTI Sahayak API",
    description="RAG-based AI Assistant for Intellectual Property and Ayurveda",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# Request / Response Models
# =========================================================

class ChatRequest(BaseModel):
    # Frontend sends "message"
    message: Optional[str] = None

    # Backend can also accept "query"
    query: Optional[str] = None

    user_id: Optional[str] = "default_user"
    conversation_id: Optional[str] = None
    jurisdiction: Optional[str] = "India"


class CitationItem(BaseModel):
    source: str
    snippet: str
    metadata: Optional[Dict[str, Any]] = {}


class ChatResponse(BaseModel):
    answer: str
    citations: List[CitationItem] = []
    conversation_id: str


class IPAnalysisRequest(BaseModel):
    title: str
    description: Optional[str] = ""
    claims_text: Optional[str] = ""
    ipType: Optional[str] = None
    jurisdiction: Optional[str] = "India"
    industry: Optional[str] = None
    existingIP: Optional[str] = None


# =========================================================
# Root
# =========================================================

@app.get("/")
def root():
    return {
        "status": "online",
        "message": "IP-SAKTI Sahayak Backend API is running successfully",
        "docs_url": "/docs"
    }


# =========================================================
# Health Check
# =========================================================

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "IP-SAKTI Sahayak Backend"
    }


# =========================================================
# CHAT API
# =========================================================

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):

    # Accept either "message" or "query"
    user_query = request.message or request.query

    if not user_query or not user_query.strip():
        raise HTTPException(
            status_code=400,
            detail="Message/query cannot be empty"
        )

    try:

        result = await handle_chat_query(
            query=user_query.strip(),
            user_id=request.user_id or "default_user",
            conv_id=request.conversation_id,
            jurisdiction=request.jurisdiction or "India"
        )

        return result

    except Exception as e:

        print("CHAT ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"Chat processing error: {str(e)}"
        )


# =========================================================
# DOCUMENT UPLOAD
# =========================================================

@app.post("/api/documents/upload")
async def upload_document(file: UploadFile = File(...)):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No filename provided"
        )

    if not file.filename.lower().endswith((".pdf", ".txt")):
        raise HTTPException(
            status_code=400,
            detail="Only PDF and TXT files are supported"
        )

    try:

        file_bytes = await file.read()

        status_msg = ingest_file(
            filename=file.filename,
            content=file_bytes
        )

        return {
            "status": "success",
            "filename": file.filename,
            "details": status_msg
        }

    except Exception as e:

        print("UPLOAD ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"File ingestion failed: {str(e)}"
        )


# =========================================================
# IP ANALYSIS
# =========================================================

@app.post("/api/ip-analysis")
async def ip_analysis_endpoint(request: IPAnalysisRequest):

    try:

        claims = request.claims_text

        if not claims:
            claims = request.description

        analysis_result = analyze_patent_ip(
            title=request.title,
            claims_text=claims or "",
            jurisdiction=request.jurisdiction or "India"
        )

        return {
            "status": "success",
            "title": request.title,
            "analysis": analysis_result
        }

    except Exception as e:

        print("IP ANALYSIS ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"IP Analysis error: {str(e)}"
        )


# =========================================================
# SEARCH API
# =========================================================

@app.get("/api/search")
async def search_endpoint(
    query: str,
    limit: int = 5
):

    try:

        results = semantic_search(
            query=query,
            top_k=limit
        )

        return {
            "query": query,
            "count": len(results),
            "results": results
        }

    except Exception as e:

        print("SEARCH ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"Search failed: {str(e)}"
        )