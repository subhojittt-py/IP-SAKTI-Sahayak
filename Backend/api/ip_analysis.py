import os
from google import genai
from google.genai import types

client = genai.Client()

PROMPT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "prompts/ip_analysis_prompt.txt"))

def load_ip_prompt() -> str:
    if os.path.exists(PROMPT_PATH):
        with open(PROMPT_PATH, "r", encoding="utf-8") as f:
            return f.read().strip()
    return "You are an expert Intellectual Property (IP) and Patent attorney. Analyze the patent claims for novelty, non-obviousness, and scope of protection."

def analyze_patent_ip(title: str, claims_text: str, jurisdiction: str = "India") -> str:
    system_prompt = load_ip_prompt()

    user_content = f"""Title: {title}
Jurisdiction: {jurisdiction}

Patent Claims / Text:
{claims_text}

Please provide:
1. Novelty Assessment
2. Scope & Risk of Infringement
3. Key Legal Recommendations
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=user_content,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            temperature=0.3
        )
    )

    return response.text if response.text else "Unable to complete IP analysis."