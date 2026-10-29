import os
from typing import Dict
from dotenv import load_dotenv

load_dotenv()

# Server Settings
PORT: int = int(os.getenv("PORT", "8000"))
HOST: str = os.getenv("HOST", "0.0.0.0")
ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

# CORS Configuration
raw_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5000,http://localhost:5173,http://127.0.0.1:5173"
)
CORS_ORIGINS = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

# Scoring Algorithm Weights (overridable via environment variables)
SKILL_WEIGHT: float = float(os.getenv("SKILL_WEIGHT", "0.55"))
INTEREST_WEIGHT: float = float(os.getenv("INTEREST_WEIGHT", "0.20"))
SUBJECT_WEIGHT: float = float(os.getenv("SUBJECT_WEIGHT", "0.15"))
EXPERIENCE_WEIGHT: float = float(os.getenv("EXPERIENCE_WEIGHT", "0.10"))

# Display / Output Limits
MAX_MISSING_SKILLS: int = int(os.getenv("MAX_MISSING_SKILLS", "8"))
MAX_MATCHED_SKILLS: int = int(os.getenv("MAX_MATCHED_SKILLS", "8"))

# Calibration & Mastery Constants
CORE_SKILL_THRESHOLD: float = float(os.getenv("CORE_SKILL_THRESHOLD", "2.5"))
# Skills with weight >= this are "core" for a career.

# Rewards students who have the core stack even when they lack secondary tooling.
# Result: a React junior who lacks TypeScript/Tailwind scores ~87%, not ~66%.
CORE_MASTERY_BONUS: float = float(os.getenv("CORE_MASTERY_BONUS", "0.15"))

MIN_FINAL_SCORE: float = float(os.getenv("MIN_FINAL_SCORE", "15.0"))
# UX floor: no career shows below this if the student provided >=1 skill.
# Avoids demoralizing 6-9% scores for structurally-incompatible careers.

EXPERIENCE_SCORE_TIERS: Dict[str, float] = {
    "matched": 100.0,
    "near": 70.0,
    "low": 40.0,
}

# Experience Level to Numeric Midpoint Years Mapping
EXPERIENCE_YEARS_MAP: Dict[str, float] = {
    "internship": 0.5,
    "0-1": 0.5,
    "1-3": 2.0,
    "3-plus": 5.0,
    "any": 0.5,
}

# Fail fast at import time if scoring weights are misconfigured
_TOTAL_WEIGHT = round(SKILL_WEIGHT + INTEREST_WEIGHT + SUBJECT_WEIGHT + EXPERIENCE_WEIGHT, 6)
assert abs(_TOTAL_WEIGHT - 1.0) < 1e-6, (
    f"Misconfigured scoring weights: sum must equal 1.0, but got {_TOTAL_WEIGHT} "
    f"(SKILL={SKILL_WEIGHT}, INTEREST={INTEREST_WEIGHT}, "
    f"SUBJECT={SUBJECT_WEIGHT}, EXPERIENCE={EXPERIENCE_WEIGHT})"
)


def get_weights_metadata() -> dict:
    """Return transparent weights configuration and experience mapping for API inspection."""
    return {
        "weights": {
            "skill": SKILL_WEIGHT,
            "interest": INTEREST_WEIGHT,
            "subject": SUBJECT_WEIGHT,
            "experience": EXPERIENCE_WEIGHT,
            "sum": _TOTAL_WEIGHT,
        },
        "limits": {
            "max_missing_skills": MAX_MISSING_SKILLS,
            "max_matched_skills": MAX_MATCHED_SKILLS,
        },
        "calibration": {
            "core_skill_threshold": CORE_SKILL_THRESHOLD,
            "core_mastery_bonus": CORE_MASTERY_BONUS,
            "min_final_score": MIN_FINAL_SCORE,
            "experience_score_tiers": EXPERIENCE_SCORE_TIERS,
        },
        "experience_years_map": EXPERIENCE_YEARS_MAP,
    }
