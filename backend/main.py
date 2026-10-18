from fastapi import FastAPI, UploadFile, File, Request
from pathlib import Path
from backend.resume_parser import read_resume, parse_resume
from backend.jd_parser import parse_jd
from time import sleep
from backend.user_query import ChatRequest, ask_llm
from fastapi.middleware.cors import CORSMiddleware
from backend.final_score import final_score
from fastapi.responses import FileResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)

app = FastAPI()

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

resume_text = read_resume(Path("resume.pdf"))
sleep(2)
resume_json = parse_resume(resume_text)
other_info = Path("info.txt").read_text(encoding="utf-8")

@app.get("/")
def root():
    
    return{
        "Welcome to Portfolio AI"
    }

@app.post("/chat")
@limiter.limit("10/minute;100/day")
def chat(request: Request, body: ChatRequest):
    response = ask_llm(body.question, resume_json, other_info)

    return(response)

@app.post("/score")
@limiter.limit("5/minute;40/day")
async def checkScore(request: Request, file: UploadFile = File(...)):
    file_content = (await file.read()).decode("utf-8")

    jd_json = parse_jd(file_content)

    response = final_score(file_content, resume_json)

    return(response)

@app.get("/resume")
def download_resume():
    return FileResponse(
        "resume.pdf",
        media_type="application/pdf",
        filename="Chaitanya_Resume.pdf",
    )