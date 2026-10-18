# Portfolio AI

A chatbot-style portfolio. Instead of scrolling through a static page, visitors ask questions about me and get answers grounded in my resume. Recruiters can also upload a job description and see how well I match it.

**Live demo:** https://portfolio-ai-wheat-seven.vercel.app

## Features

- **Chat:** answers about my background, projects, and skills, based only on my resume and a short extra-info file
- **Compatibility tool:** upload a job description (PDF or TXT) and get a match score, matching and missing skills, and a short verdict. Nothing is stored
- Markdown replies, typing indicator, and one-click resume download
- Rate-limited public API
- Responsive dark theme

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Axios (deployed on Vercel)
- **Backend:** Python, FastAPI, Groq LLM API, Pydantic, pypdf (deployed on Render)

## How It Works

The backend parses my resume into structured data and combines it with a short info file. The LLM answers using only that data, and says so when something isn't there. For the compatibility tool, an uploaded job description is compared against the same resume data and returned as a structured score.

## Notes

- The backend is on a free tier, so the first request after a quiet period can take a few seconds.
- Uploaded job descriptions aren't saved, but their text is sent to the LLM provider to produce the score.

## Contact

Chaitanya Gokhale · [GitHub](https://github.com/ItsChaitanyaG) ·
