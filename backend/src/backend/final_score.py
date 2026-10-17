from backend.client import client, MODEL
from pydantic import BaseModel
import json

class MatchResult(BaseModel):
    score: float
    details: dict

match_result_schema = MatchResult.model_json_schema()

response_format = {
    "type": "json_object"
}

def final_score(jd_text, resume_json):
    prompt=f"""
    You are an HR recruiter
    Compare job description and resume. JD:{jd_text}, resume:{resume_json}

    return json matching this schema : {match_result_schema}

    Give me:
    1.Name
    2.Matching skills
    3.Missing important skills
    4.Whether experience reuirement is met
    5.Overall match percentage from 0 to 100
    6.A short final verdict
    """

    message={
        "role":"user",
        "content":prompt
    }

    messages = [message]

    response = client.chat.completions.create(model=MODEL, messages=messages, temperature=0, response_format=response_format)

    final_score_json = json.loads(response.choices[0].message.content)

    return MatchResult(**final_score_json)