from backend.client import client, MODEL
from pydantic import BaseModel
from backend.resume_parser import Resume

class ChatRequest(BaseModel):
    question:str

def ask_llm(user_query: str, resume: Resume):
    system_prompt = f"""
    You are an AI assistant representing a job candidate.

    Below is everything you need to know about candidate.

    {resume}

    Rules:
    1. Answer using only this information.
    2. Never hallucinate.
    3. If information is unavailable, say "I don't have enough information to answer that."
    4. Be professional.
    5. Answer as if HR is interviewing this candidate.
    """

    response = client.chat.completions.create(
        model = MODEL,
        messages= [
            {
                "role":"system",
                "content":system_prompt
            },
            {
                "role":"user",
                "content": user_query
            }
        ]
    )

    return response.choices[0].message.content