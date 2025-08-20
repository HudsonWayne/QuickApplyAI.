from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from cv_parser import parse_cv

app = FastAPI()

# CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js runs here
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running!"}

@app.post("/upload-cv")
async def upload_cv(cv: UploadFile = File(...)):
    content = await cv.read()

    parsed_data = parse_cv(content)

    return {
        "filename": cv.filename,
        "skills": parsed_data.get("skills", []),
        "achievements": parsed_data.get("achievements", [])
    }
