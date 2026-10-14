from client import client, MODEL 
from pydantic import BaseModel
import json

#model
class MatchResult(BaseModel):
    score:float
    details:dict

schema_matchRes = MatchResult.model_json_schema()

response_format = {
    "type":"json_object"
}

#comparing resume
def match_resume(jd_json, resume_json):
    prompt=f"""
    You are an HR recruiter
    Compare job description and resume. JD:{jd_json}, resume:{resume_json}

    return json matching this schema : {schema_matchRes}

    Give me:
    1.Name
    2.Matching skills
    3.Missing important skills
    4.Whether experience requirement is met
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