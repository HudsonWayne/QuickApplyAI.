from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from cv_parser import parse_cv
from io import BytesIO

app = FastAPI()

# Allow frontend (Next.js running on localhost:3000) to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running!"}

@app.post("/upload-cv")
async def upload_cv(cv: UploadFile = File(...)):
    # Read the file into memory
    content = await cv.read()

    # Wrap bytes in BytesIO so pdfplumber can read it like a file
    file_like = BytesIO(content)

    # Parse CV
    parsed_data = parse_cv(file_like)

    return {
        "filename": cv.filename,
        "skills": parsed_data.get("skills", []),
        "achievements": parsed_data.get("achievements", [])
    }
