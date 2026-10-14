from client.py import client, MODEL
from pydantic import BaseModel

# models
class Jd(BaseModel):
    role:str
    required_skills:list[str]
    preferred_skills:list[str]
    min_experience:float | None = None
    educational_req:list[str]

jd_schema = Jd.model_json_schema()

response_format = {
    "type":"json_object"
}

# parsing JD
def parse_jd(jd_text):
    if not jd_text:
        raise ValueError("JD Text not available...")

    system_prompt=f"""
    Extract required information from Job description strictly based on this schema in json : {jd_schema}
    If information for list is missing, return an empty list. Do not invent information.
    """

    user_prompt=f"""
    This is job description. Extract all required information. {jd_text}
    """

    system_message = {
        "role":"system",
        "content": system_prompt
    }

    user_message = {
        "role":"user",
        "content":user_prompt
    }

    messages = [system_message, user_message]

    response = client.chat.completions.create(model=model, messages=messages, temperature=0, response_format=response_format)

    if not response:
        raise ValueError("Did not get jd response from client...")

    jd_json = response.choices[0].message.content

    return jd_json