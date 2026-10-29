from typing import Any, List, Literal, Optional
from pydantic import BaseModel, Field, field_validator

# Supported experience level intervals
ExperienceLevel = Literal["internship", "0-1", "1-3", "3-plus", "any"]

# Categorical fit tiers for UX transparency (strong >= 70%, moderate 45-69.9%, explore < 45%)
MatchTier = Literal["strong", "moderate", "explore"]


class StudentInput(BaseModel):
    """Input payload representing student profile and preferences."""
    skills: List[str] = Field(
        default_factory=list,
        description="List of skills student currently possesses"
    )
    interests: List[str] = Field(
        default_factory=list,
        description="Student areas of interest or domain passions"
    )
    subjects: List[str] = Field(
        default_factory=list,
        description="Academic subjects completed or mastered"
    )
    experience: ExperienceLevel = Field(
        default="0-1",
        description="Student current or target experience level bracket"
    )

    @field_validator("skills", "interests", "subjects", mode="before")
    @classmethod
    def clean_and_dedupe_string_list(cls, value: Any) -> List[str]:
        """Trim whitespace and deduplicate items case-insensitively while preserving original order."""
        if not isinstance(value, list):
            return []
        seen = set()
        cleaned: List[str] = []
        for item in value:
            if item is None:
                continue
            s = str(item).strip()
            if not s:
                continue
            s_lower = s.lower()
            if s_lower not in seen:
                seen.add(s_lower)
                cleaned.append(s)
        return cleaned


class CareerSkillInput(BaseModel):
    """Skill associated with a career in the recommendation catalog."""
    name: str = Field(..., description="Canonical name of the skill")
    weight: float = Field(..., ge=0.0, description="Relevance weight (e.g. 0.1 to 3.0)")
    is_missing_highlight: bool = Field(
        default=False,
        description="Whether this skill should be highlighted as a gap if missing"
    )
    category: Optional[str] = Field(
        default=None,
        description="Optional skill category (e.g. Frontend, Backend, Tooling)"
    )

    @field_validator("name", mode="before")
    @classmethod
    def trim_name(cls, value: Any) -> str:
        if isinstance(value, str):
            return value.strip()
        return str(value).strip()


class CareerInterestInput(BaseModel):
    """Interest associated with a career."""
    name: str = Field(..., description="Interest tag or domain name")
    weight: float = Field(..., ge=0.0, description="Relevance weight for the career")

    @field_validator("name", mode="before")
    @classmethod
    def trim_name(cls, value: Any) -> str:
        if isinstance(value, str):
            return value.strip()
        return str(value).strip()


class CareerSubjectInput(BaseModel):
    """Academic subject associated with a career."""
    name: str = Field(..., description="Academic subject name")
    weight: float = Field(..., ge=0.0, description="Relevance weight for the career")

    @field_validator("name", mode="before")
    @classmethod
    def trim_name(cls, value: Any) -> str:
        if isinstance(value, str):
            return value.strip()
        return str(value).strip()


class CareerInput(BaseModel):
    """Full career data representation passed by caller for scoring."""
    id: int = Field(..., description="Unique database identifier for the career")
    title: str = Field(..., description="Canonical job or career title")
    typical_work_experience: ExperienceLevel = Field(
        default="any",
        description="Typical work experience level required by this career"
    )
    skills: List[CareerSkillInput] = Field(
        default_factory=list,
        description="Career required and bonus skills with weights"
    )
    interests: List[CareerInterestInput] = Field(
        default_factory=list,
        description="Career interest areas with weights"
    )
    subjects: List[CareerSubjectInput] = Field(
        default_factory=list,
        description="Career relevant academic subjects with weights"
    )

    @field_validator("title", mode="before")
    @classmethod
    def trim_title(cls, value: Any) -> str:
        if isinstance(value, str):
            return value.strip()
        return str(value).strip()


class RecommendRequest(BaseModel):
    """Request payload for /recommend endpoint."""
    student: StudentInput = Field(..., description="Student input attributes")
    careers: List[CareerInput] = Field(
        ...,
        min_length=1,
        description="Array of career catalog objects to score against"
    )

    @field_validator("careers")
    @classmethod
    def validate_careers_not_empty(cls, value: List[CareerInput]) -> List[CareerInput]:
        if not value or len(value) == 0:
            raise ValueError("The 'careers' list cannot be empty. Caller must provide at least one career.")
        return value


class SubScores(BaseModel):
    """Normalized sub-scores (0-100) per evaluation category."""
    skills: float = Field(..., description="Skill alignment score (0-100)")
    interests: float = Field(..., description="Interest alignment score (0-100)")
    subjects: float = Field(..., description="Academic subject alignment score (0-100)")
    experience: float = Field(..., description="Work experience fit score (0-100)")


class MissingSkill(BaseModel):
    """Critical career skill the student currently lacks."""
    name: str = Field(..., description="Skill name")
    weight: float = Field(..., description="Importance weight of skill in career")
    category: Optional[str] = Field(default=None, description="Skill category if available")


class GapSummary(BaseModel):
    """Categorized skill gaps divided into critical core and secondary tooling."""
    core_gaps: List[str] = Field(
        default_factory=list,
        description="Missing skills with weight >= 2.5, sorted by weight DESC"
    )
    secondary_gaps: List[str] = Field(
        default_factory=list,
        description="Missing skills with weight < 2.5, sorted by weight DESC"
    )
    core_gap_count: int = Field(
        ...,
        ge=0,
        description="Count of missing core skills"
    )
    secondary_gap_count: int = Field(
        ...,
        ge=0,
        description="Count of missing secondary skills"
    )


class CareerRecommendation(BaseModel):
    """Ranked career recommendation item with calibrated match tier and gap summary."""
    career_id: int = Field(..., description="Career database ID")
    career_title: str = Field(..., description="Career title")
    rank: int = Field(..., ge=1, description="Rank position (1 is best match)")
    match_percent: float = Field(..., ge=0.0, le=100.0, description="Final weighted match percentage (0-100)")
    match_tier: MatchTier = Field(
        ...,
        description="Categorical fit tier: strong (>=70%), moderate (45-69.9%), explore (<45%)"
    )
    sub_scores: SubScores = Field(..., description="Detailed component sub-scores")
    matched_skills: List[str] = Field(
        default_factory=list,
        description="Top matched skills student possesses, sorted by weight DESC"
    )
    missing_skills: List[MissingSkill] = Field(
        default_factory=list,
        description="Top critical missing skills (is_missing_highlight=true), sorted by weight DESC"
    )
    gap_summary: GapSummary = Field(
        ...,
        description="Categorized gap analysis dividing all missing skills into core vs secondary"
    )


# Alias for explicit naming consistency
RecommendationResult = CareerRecommendation


class RecommendationData(BaseModel):
    """Payload wrapper for recommendations and sanitized student input echo."""
    recommendations: List[CareerRecommendation]
    input_echo: StudentInput


class RecommendResponse(BaseModel):
    """Standard success response for /recommend endpoint."""
    success: bool = True
    data: RecommendationData


class HealthResponse(BaseModel):
    """Response schema for /health endpoint."""
    status: str = "healthy"
    service: str = "career-ml-service"
    version: str = "1.0.0"


class ErrorResponse(BaseModel):
    """Standard error response structure."""
    success: bool = False
    error: str
