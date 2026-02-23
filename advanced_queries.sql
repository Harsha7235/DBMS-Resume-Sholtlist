SELECT 
    comp.company_name,
    j.job_title,
    j.required_experience
FROM Company comp
JOIN JobRole j 
    ON comp.company_id = j.company_id;

SELECT 
    comp.company_name,
    j.job_title,
    j.required_experience
FROM Company comp
JOIN JobRole j 
    ON comp.company_id = j.company_id;

SELECT 
    c.name,
    j.job_title,
    s.match_score,
    s.shortlisted_status
FROM Candidate c
JOIN Resume r 
    ON c.candidate_id = r.candidate_id
JOIN AI_Score s 
    ON r.resume_id = s.resume_id
JOIN JobRole j 
    ON s.job_id = j.job_id
WHERE s.shortlisted_status = 'Yes';

SELECT 
    c.name,
    j.job_title,
    s.match_score
FROM Candidate c
JOIN Resume r ON c.candidate_id = r.candidate_id
JOIN AI_Score s ON r.resume_id = s.resume_id
JOIN JobRole j ON s.job_id = j.job_id
ORDER BY s.match_score DESC
LIMIT 5;

SELECT 
    j.job_title,
    AVG(s.match_score) AS Average_Score
FROM AI_Score s
JOIN JobRole j 
    ON s.job_id = j.job_id
GROUP BY j.job_title;

SELECT 
    j.job_title,
    COUNT(a.application_id) AS Total_Applications
FROM JobRole j
LEFT JOIN Application a 
    ON j.job_id = a.job_id
GROUP BY j.job_title;

SELECT name, experience_years
FROM Candidate
WHERE experience_years > 2;

SELECT 
    result,
    COUNT(*) AS Total
FROM Interview
GROUP BY result;

CREATE VIEW Shortlisted_Candidates AS
SELECT 
    c.name,
    j.job_title,
    s.match_score
FROM Candidate c
JOIN Resume r ON c.candidate_id = r.candidate_id
JOIN AI_Score s ON r.resume_id = s.resume_id
JOIN JobRole j ON s.job_id = j.job_id
WHERE s.shortlisted_status = 'Yes';

SELECT * FROM Shortlisted_Candidates;    