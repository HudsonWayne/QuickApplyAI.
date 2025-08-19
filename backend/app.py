from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to connect
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
    content = await cv.read()
    # For now, just return file info
    return {"filename": cv.filename, "size": len(content)}
