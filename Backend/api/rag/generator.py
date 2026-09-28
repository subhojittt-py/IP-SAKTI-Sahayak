import os
from typing import List, Dict, Tuple
from google import genai
from google.genai import types

# GEMINI_API_KEY environment variable theke nebe
client = genai.Client()

SYSTEM_PROMPT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "prompts/system_prompt.txt"))

def load_system_prompt() -> str:
    if os.path.exists(SYSTEM_PROMPT_PATH):
        with open(SYSTEM_PROMPT_PATH, "r", encoding="utf-8") as f:
            return f.read().strip()
    return "You are an expert Legal and IP Assistant. Provide clear, well-cited answers based on the context."

def generate_response(query: str, context_chunks: List[Dict]) -> Tuple[str, List[Dict]]:
    system_prompt = load_system_prompt()
    
    # Chunks gulo format kora
    formatted_context = ""
    citations = []
    
    for idx, item in enumerate(context_chunks, start=1):
        text = item.get("text", "")
        meta = item.get("metadata", {})
        source_name = meta.get("source", f"Source {idx}")
        
        formatted_context += f"\n\n[Document {idx} - Source: {source_name}]\n{text}"
        citations.append({
            "source": source_name,
            "snippet": text[:150] + "..." if len(text) > 150 else text,
            "metadata": meta
        })
        
    full_prompt = f"""Context:
{formatted_context}

Question:
{query}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=full_prompt,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            temperature=0.2
        )
    )
    
    answer_text = response.text if response.text else "No response could be generated."
    return answer_text, citations