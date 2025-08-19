import PyPDF2
import spacy

# Load English NLP model
nlp = spacy.load("en_core_web_sm")

# Example list of common skills (expand later)
COMMON_SKILLS = [
    "Python", "JavaScript", "Java", "C++", "SQL", "HTML", "CSS",
    "Django", "Flask", "React", "Node.js", "MongoDB", "AWS"
]

def parse_cv(file_content: bytes):
    """
    Extract text, skills, and achievements from PDF CV.
    """
    # Read PDF content
    pdf_reader = PyPDF2.PdfReader(file_content)
    text = ""
    for page in pdf_reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    # NLP processing
    doc = nlp(text)

    # Extract skills
    skills_found = [skill for skill in COMMON_SKILLS if skill.lower() in text.lower()]

    # Extract achievements (sentences containing keywords)
    achievement_keywords = ["award", "winner", "recognized", "achieved", "honor"]
    achievements = [sent.text for sent in doc.sents if any(k in sent.text.lower() for k in achievement_keywords)]

    # Return parsed data
    return {
        "text": text,
        "skills": skills_found,
        "achievements": achievements
    }
