import sqlite3

conn = sqlite3.connect("recruitment_db.sqlite")
cursor = conn.cursor()

# Create tables

cursor.execute("""
CREATE TABLE IF NOT EXISTS Candidate (
    candidate_id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    education TEXT,
    experience_years INTEGER
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Resume (
    resume_id INTEGER PRIMARY KEY,
    resume_text TEXT,
    upload_date TEXT,
    candidate_id INTEGER UNIQUE,
    FOREIGN KEY (candidate_id) REFERENCES Candidate(candidate_id)
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS JobRole (
    job_id INTEGER PRIMARY KEY,
    job_title TEXT,
    required_experience INTEGER,
    job_description TEXT,
    company_id INTEGER
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS AI_Score (
    score_id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_score REAL,
    shortlisted_status TEXT,
    resume_id INTEGER,
    job_id INTEGER
);
""")

# Insert sample data

cursor.execute("INSERT INTO Candidate VALUES (1, 'Harsha', 'harsha@gmail.com', '9876543210', 'BTech', 1)")
cursor.execute("INSERT INTO Resume VALUES (1, 'Python SQL Machine Learning', '2026-02-01', 1)")
cursor.execute("INSERT INTO JobRole VALUES (1, 'Data Analyst', 1, 'SQL Python required', 1)")

conn.commit()
conn.close()

print("Database initialized successfully!")