from pydantic import Basemodel
from client.py import client, MODEL
import json

class Experience(BaseModel):
    company:str | None = None
    role:str | None = None
    duration:str | None = None
    description:str | None = None
    used_skills:list[str] = []

exp_schema = Experience.model_json_schema()

class Resume(BaseModel):
    name:str | None = None
    email:str | None = None
    phone:str | None = None
    total_exp_years:float | None = None
    skills:list[str] = []
    experiences:list[Experience] = []
    projects:list[str] = []
    certifications:list[str] = []

resume_schema = Resume.model_json_schema()

responce_format = {
    "type":"json_object"
}

# Reading Resume
def read_resume(file_path):

    if file_path.lower().endswith(".pdf"):
        reader = PdfReader(file_path)

        text = ''

        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "/n"
            return text
    elif file_path.lower().endswith(".docx"):
        return Document(file_path)
    else:
        return None

# Making JSON
def parse_resume(resume_text):
    if not resume_text:
        raise ValueError("Resume Text not available...")

    system_prompt = f"""
    Extract required information from resume strictly based on this schema in json : {schema_resume},
    Schema for Experience in json : {schema_exp}
    """

    user_prompt = f"""
    This is resume. Extract all required information. Do not invent any information. {resume_text}
    """

    system_message = {
        "role":"system",
        "content":system_prompt
    }

    user_message = {
        "role":"user",
        "content":user_prompt
    }

    messages = [system_message, user_message]

    response = client.chat.completions.create(model=model, messages=messages, temperature=0, response_format=responce_format)

    if not response:
        raise ValueError("Did not get resume response from client...")

    resume_json = response.choices[0].message.content

    return resume_json