from fastapi import FastAPI, UploadFile, File
from pathlib import Path
from backend.resume_parser import read_resume, parse_resume
from time import sleep
from backend.user_query import ChatRequest, ask_llm
from fastapi.middleware.cors import CORSMiddleware
from backend.final_score import final_score
from fastapi.responses import FileResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

resume_text = read_resume(Path("resume.pdf"))
sleep(2)
resume_json = parse_resume(resume_text)

@app.get("/")
def root():
    
    return{
        "Welcome to Portfolio AI"
    }

@app.post("/chat")
def chat(request: ChatRequest):
    response = ask_llm(request.question, resume_json)

    return(response)

@app.post("/score")
async def checkScore(file: UploadFile = File(...)):
    file_content = (await file.read()).decode("utf-8")

    response = final_score(file_content, resume_json)

    return(response)

@app.get("/resume")
def download_resume():
    return FileResponse(
        "resume.pdf",
        media_type="application/pdf",
        filename="Chaitanya_Resume.pdf",
    )