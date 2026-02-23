"CREATE TABLE Candidate (
    candidate_id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    education TEXT,
    experience_years INTEGER
)"
"CREATE TABLE Company (
    company_id INTEGER PRIMARY KEY,
    company_name TEXT,
    industry TEXT,
    location TEXT
)"
"CREATE TABLE JobRole (
    job_id INTEGER PRIMARY KEY,
    job_title TEXT,
    required_experience INTEGER,
    job_description TEXT,
    company_id INTEGER,
    FOREIGN KEY (company_id) REFERENCES Company(company_id)
)"
"CREATE TABLE Resume (
    resume_id INTEGER PRIMARY KEY,
    resume_text TEXT,
    upload_date TEXT,
    candidate_id INTEGER UNIQUE,
    FOREIGN KEY (candidate_id) REFERENCES Candidate(candidate_id)
)"
"CREATE TABLE Skill (
    skill_id INTEGER PRIMARY KEY,
    skill_name TEXT,
    skill_category TEXT
)"
"CREATE TABLE Application (
    application_id INTEGER PRIMARY KEY,
    application_date TEXT,
    status TEXT,
    candidate_id INTEGER,
    job_id INTEGER,
    FOREIGN KEY (candidate_id) REFERENCES Candidate(candidate_id),
    FOREIGN KEY (job_id) REFERENCES JobRole(job_id)
)"
"CREATE TABLE Interview (
    interview_id INTEGER PRIMARY KEY,
    interview_date TEXT,
    interview_type TEXT,
    result TEXT,
    application_id INTEGER,
    FOREIGN KEY (application_id) REFERENCES Application(application_id)
)"
"CREATE TABLE AI_Score (
    score_id INTEGER PRIMARY KEY,
    match_score REAL,
    shortlisted_status TEXT,
    resume_id INTEGER,
    job_id INTEGER,
    FOREIGN KEY (resume_id) REFERENCES Resume(resume_id),
    FOREIGN KEY (job_id) REFERENCES JobRole(job_id)
)"
