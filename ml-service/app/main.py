import logging
from contextlib import asynccontextmanager
from typing import Any, Dict
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import (
    CORS_ORIGINS,
    get_weights_metadata,
)
from app.schemas import (
    ErrorResponse,
    HealthResponse,
    RecommendationData,
    RecommendRequest,
    RecommendResponse,
)
from app.scoring import calculate_career_recommendations

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [%(name)s] %(message)s",
)
logger = logging.getLogger("career-ml-service")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle event handler for FastAPI startup and shutdown."""
    logger.info("Initializing Career ML Service...")
    logger.info("Allowed CORS origins: %s", CORS_ORIGINS)
    yield
    logger.info("Shutting down Career ML Service...")


app = FastAPI(
    title="AI Career Recommendation ML Service",
    description=(
        "Stateless, rule-based career recommendation scoring engine. "
        "Evaluates student skills, interests, academic subjects, and work experience "
        "against career profiles to compute match percentages and skill gaps."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------
# Exception Handlers
# ---------------------------------------------------------------------
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Format 422 validation errors into structured, predictable JSON."""
    error_messages = []
    for error in exc.errors():
        field_loc = " -> ".join(str(loc) for loc in error.get("loc", []) if loc != "body")
        msg = error.get("msg", "Invalid value")
        error_messages.append(f"{field_loc}: {msg}" if field_loc else msg)

    combined_error = "; ".join(error_messages) or "Validation failed for request payload."
    logger.warning("Validation error on %s %s: %s", request.method, request.url.path, combined_error)

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": combined_error,
        },
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Catch-all 500 handler ensuring structured JSON responses."""
    logger.exception("Unhandled error processing %s %s: %s", request.method, request.url.path, str(exc))
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": "Internal server error occurred while processing recommendation.",
        },
    )


# ---------------------------------------------------------------------
# API Endpoints
# ---------------------------------------------------------------------
@app.get(
    "/health",
    response_model=HealthResponse,
    summary="Health Check",
    tags=["Monitoring"],
)
async def health_check() -> HealthResponse:
    """Check service health and operational status."""
    return HealthResponse(
        status="healthy",
        service="career-ml-service",
        version="1.0.0",
    )


@app.get(
    "/weights",
    summary="Algorithm Weights Configuration",
    tags=["Configuration"],
)
async def get_weights() -> Dict[str, Any]:
    """
    Return the active scoring algorithm weights, display limits, and experience mapping.
    Makes the recommendation rules transparent and tunable without code changes.
    """
    return get_weights_metadata()


@app.post(
    "/recommend",
    response_model=RecommendResponse,
    responses={
        422: {"model": ErrorResponse, "description": "Validation Error"},
        500: {"model": ErrorResponse, "description": "Internal Server Error"},
    },
    summary="Calculate Career Recommendations",
    tags=["Recommendations"],
)
async def recommend_careers(payload: RecommendRequest) -> RecommendResponse:
    """
    Calculate ranked career recommendations for a student profile against
    a set of career profiles provided in the request body.
    """
    careers_count = len(payload.careers)
    skills_count = len(payload.student.skills)

    # Privacy-conscious logging (no PII, no full payload)
    logger.info(
        "Received /recommend request: careers_count=%d, student_skills_count=%d, experience_level='%s'",
        careers_count,
        skills_count,
        payload.student.experience,
    )

    ranked_recommendations = calculate_career_recommendations(
        student=payload.student,
        careers=payload.careers,
    )

    top_pick = ranked_recommendations[0] if ranked_recommendations else None
    if top_pick:
        logger.info(
            "Completed /recommend: ranked %d careers. Top match: '%s' (score=%.1f%%)",
            len(ranked_recommendations),
            top_pick.career_title,
            top_pick.match_percent,
        )

    return RecommendResponse(
        success=True,
        data=RecommendationData(
            recommendations=ranked_recommendations,
            input_echo=payload.student,
        ),
    )

