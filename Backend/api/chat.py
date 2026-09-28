from api.rag.retriver import retrieve_relevant_chunks
from api.rag.rerankar import rerank_documents
from api.rag.generator import generate_response


async def handle_chat_query(
    query: str,
    user_id: str = "default_user",
    conv_id: str = None,
    jurisdiction: str = "India"
):
    raw_chunks = retrieve_relevant_chunks(
        query=query,
        top_k=6,
        jurisdiction=jurisdiction
    )

    ranked_chunks = rerank_documents(
        query=query,
        docs=raw_chunks,
        top_n=3
    )

    answer, citations = generate_response(
        query=query,
        context_chunks=ranked_chunks
    )

    session_id = conv_id if conv_id else f"{user_id}_session"

    return {
        "answer": answer,
        "citations": citations,
        "conversation_id": session_id
    }