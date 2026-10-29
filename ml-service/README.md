# ML Career Recommendation Service

A high-performance, stateless, rule-based career recommendation scoring engine built with **FastAPI**, **Uvicorn**, and **Pydantic v2**.

The service evaluates student skills, interests, academic subjects, and work experience against a catalog of careers passed in the request body. It operates strictly in memory without direct database connections or external LLM dependencies, returning ranked career matches with granular sub-scores and highlighted skill gap analysis.

---

## Scoring Algorithm Overview

The scoring engine employs a transparent, multi-dimensional weighted matching model calibrated across four distinct scoring dimensions, producing a normalized final match score from **0.0% to 100.0%**:

1. **Skills Alignment (55% Weight)**:
   Skills are the primary determinant of career readiness. For each career, the engine considers all skills marked as critical (`is_missing_highlight == true`) or carrying a significant weight (`weight >= 1.0`). The sub-score represents the percentage of total counted skill weight satisfied by the student's existing skills (`matched_weight / total_weight * 100`). Skills the student lacks that are flagged as critical are prioritized and returned as actionable **missing skills** sorted by weight descending.

2. **Interests Alignment (20% Weight)**:
   Student domain passions and work preferences (e.g., `web`, `ai`, `design`, `security`) are matched case-insensitively against career interest tags. The interest score measures the proportion of career interest weight satisfied by the student's selections.

3. **Academic Subjects Alignment (15% Weight)**:
   Foundational coursework and technical subject mastery (e.g., `Data Structures`, `DBMS`, `Operating Systems`) are evaluated against career subject requirements, computing a weighted percentage match similar to interests.

4. **Experience Level Fit (10% Weight)**:
   Experience brackets (`internship`, `0-1`, `1-3`, `3-plus`, `any`) are converted to numerical midpoint years. Careers requiring `any` experience automatically yield a 100% score. Otherwise, students meeting or exceeding the career midpoint receive 100%, students within 1 year receive 70%, and others receive 40% base credit.

The composite score is rounded to one decimal place, careers are ranked from highest to lowest match, and deterministic tie-breaking ensures consistent results.

---

## Getting Started (Windows PowerShell)

### 1. Prerequisites
- Python 3.11 or higher
- PowerShell or command prompt

### 2. Create and Activate Virtual Environment
Open PowerShell in the `ml-service` directory:

```powershell
cd p:\ai-career-recommender\ml-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1
```

> If script execution is restricted, run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`

### 3. Install Dependencies
```powershell
pip install -r requirements.txt
```

### 4. Configure Environment
Copy `.env.example` to `.env`:

```powershell
Copy-Item .env.example .env
```

### 5. Start the Service
```powershell
python run.py
```

The service will boot on `http://127.0.0.1:8000`.

- Interactive Swagger API Documentation: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Alternative ReDoc Documentation: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## API Endpoints & Sample Requests

### 1. Health Check
Checks service operational status and version.

**Request:**
```bash
curl -X GET http://127.0.0.1:8000/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "career-ml-service",
  "version": "1.0.0"
}
```

---

### 2. Algorithm Weights Configuration
Returns the active scoring weights, experience midpoint mappings, and output limits.

**Request:**
```bash
curl -X GET http://127.0.0.1:8000/weights
```

**Response:**
```json
{
  "weights": {
    "skill": 0.55,
    "interest": 0.20,
    "subject": 0.15,
    "experience": 0.10,
    "sum": 1.0
  },
  "limits": {
    "max_missing_skills": 8,
    "max_matched_skills": 8
  },
  "experience_years_map": {
    "internship": 0.5,
    "0-1": 0.5,
    "1-3": 2.0,
    "3-plus": 5.0,
    "any": 0.5
  }
}
```

---

### 3. Career Recommendations
Accepts student attributes along with a list of careers to evaluate.

**Request:**
```bash
curl -X POST http://127.0.0.1:8000/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "student": {
      "skills": ["JavaScript", "React", "SQL", "Git"],
      "interests": ["web", "design", "product"],
      "subjects": ["Data Structures", "DBMS", "Mathematics"],
      "experience": "0-1"
    },
    "careers": [
      {
        "id": 1,
        "title": "Full Stack Developer",
        "typical_work_experience": "any",
        "skills": [
          {"name": "JavaScript", "weight": 3.0, "is_missing_highlight": true},
          {"name": "React", "weight": 2.5, "is_missing_highlight": true},
          {"name": "Node.js", "weight": 2.5, "is_missing_highlight": true},
          {"name": "Express", "weight": 2.0, "is_missing_highlight": true},
          {"name": "SQL", "weight": 2.0, "is_missing_highlight": true},
          {"name": "HTML", "weight": 2.0, "is_missing_highlight": true},
          {"name": "Git", "weight": 2.0, "is_missing_highlight": false},
          {"name": "Docker", "weight": 1.5, "is_missing_highlight": true}
        ],
        "interests": [
          {"name": "web", "weight": 2.0},
          {"name": "product", "weight": 1.5}
        ],
        "subjects": [
          {"name": "Data Structures", "weight": 2.0},
          {"name": "DBMS", "weight": 2.0}
        ]
      }
    ]
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "career_id": 1,
        "career_title": "Full Stack Developer",
        "rank": 1,
        "match_percent": 75.8,
        "sub_scores": {
          "skills": 55.9,
          "interests": 100.0,
          "subjects": 100.0,
          "experience": 100.0
        },
        "matched_skills": [
          "JavaScript",
          "React",
          "Git",
          "SQL"
        ],
        "missing_skills": [
          {"name": "Node.js", "weight": 2.5, "category": null},
          {"name": "Express", "weight": 2.0, "category": null},
          {"name": "HTML", "weight": 2.0, "category": null},
          {"name": "Docker", "weight": 1.5, "category": null}
        ]
      }
    ],
    "input_echo": {
      "skills": ["JavaScript", "React", "SQL", "Git"],
      "interests": ["web", "design", "product"],
      "subjects": ["Data Structures", "DBMS", "Mathematics"],
      "experience": "0-1"
    }
  }
}
```

---

## Edge Cases Handled

- **Empty Student Skills**: Handled gracefully (`skill_score = 0.0`); ranks are driven by interests, subjects, and experience.
- **Case & Whitespace Insensitivity**: Inputs like `"  react  "` and `"React"` match identically.
- **Student Input Deduplication**: Redundant skills, interests, or subjects are deduplicated case-insensitively during request validation.
- **Empty Careers List**: Returns HTTP 422 with a structured error response.
- **Careers with Zero Skills/Interests/Subjects**: Handled safely without division by zero errors.
- **Privacy & Logging**: Request size and top match titles are logged; student PII and request bodies are never written to logs.
