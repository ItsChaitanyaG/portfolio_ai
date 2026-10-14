from fastapi import FastAPI
from pathlib import Path
from backend.resume_parser import read_resume, parse_resume
from time import sleep

app = FastAPI()

@app.get("/")
def root():
    resume_text = read_resume(Path("resume.pdf"))
    sleep(2)
    resume_json = parse_resume(resume_text)
    return{
        "Resume parsed"
    }