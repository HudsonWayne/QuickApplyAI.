import PyPDF2
import spacy
import io  # <-- important

nlp = spacy.load("en_core_web_sm")

COMMON_SKILLS = [
    "Python", "JavaScript", "Java", "C++", "SQL", "HTML", "CSS",
    "Django", "Flask", "React", "Node.js", "MongoDB", "AWS"
]

def parse_cv(file_content: bytes):
    # Convert bytes to file-like object
    pdf_file = io.BytesIO(file_content)
    
    # PdfReader must receive a file-like object
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    doc = nlp(text)

    skills_found = [skill for skill in COMMON_SKILLS if skill.lower() in text.lower()]

    achievement_keywords = ["award", "winner", "recognized", "achieved", "honor"]
    achievements = [sent.text for sent in doc.sents if any(k in sent.text.lower() for k in achievement_keywords)]

    return {
        "text": text,
        "skills": skills_found,
        "achievements": achievements
    }
