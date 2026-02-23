from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import sqlite3
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# FULL ABSOLUTE PATH (EDIT THIS LINE EXACTLY)
DATABASE = "recruitment_db.sqlite"

print("Using database:", DATABASE)


def calculate_score(resume_text, job_description):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text, job_description])
    similarity = cosine_similarity(vectors[0:1], vectors[1:2])
    return float(similarity[0][0]) * 100


@app.get("/calculate/{resume_id}/{job_id}")
def calculate_ai_score(resume_id: int, job_id: int):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    print("Tables in DB:", cursor.fetchall())

    cursor.execute("SELECT resume_text FROM Resume WHERE resume_id = ?", (resume_id,))
    resume_row = cursor.fetchone()

    if resume_row is None:
        conn.close()
        return {"error": "Resume not found"}

    resume_text = resume_row[0]

    cursor.execute("SELECT job_description FROM JobRole WHERE job_id = ?", (job_id,))
    job_row = cursor.fetchone()

    if job_row is None:
        conn.close()
        return {"error": "Job not found"}

    job_description = job_row[0]

    score = calculate_score(resume_text, job_description)

    cursor.execute("""
        INSERT INTO AI_Score (match_score, shortlisted_status, resume_id, job_id)
        VALUES (?, ?, ?, ?)
    """, (
        score,
        "Yes" if score > 70 else "No",
        resume_id,
        job_id
    ))

    conn.commit()
    conn.close()

    return {"resume_id": resume_id, "job_id": job_id, "score": score}