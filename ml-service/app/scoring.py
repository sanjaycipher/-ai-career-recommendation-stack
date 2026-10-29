from typing import List, Literal, Set, Tuple
from app.config import (
    SKILL_WEIGHT,
    INTEREST_WEIGHT,
    SUBJECT_WEIGHT,
    EXPERIENCE_WEIGHT,
    MAX_MISSING_SKILLS,
    MAX_MATCHED_SKILLS,
    CORE_SKILL_THRESHOLD,
    CORE_MASTERY_BONUS,
    MIN_FINAL_SCORE,
    EXPERIENCE_SCORE_TIERS,
    EXPERIENCE_YEARS_MAP,
)
from app.schemas import (
    CareerInput,
    CareerInterestInput,
    CareerRecommendation,
    CareerSkillInput,
    CareerSubjectInput,
    GapSummary,
    MissingSkill,
    StudentInput,
    SubScores,
)


def compute_skill_score(
    career_skills: List[CareerSkillInput],
    student_skill_names: Set[str],
) -> float:
    """
    Compute normalized skill score (0-100) with core-skill mastery bonus.
    
    Rewards students who have the core stack even when they lack secondary tooling.
    """
    total_weight = sum(s.weight for s in career_skills)
    matched_weight = sum(
        s.weight
        for s in career_skills
        if s.name.casefold().strip() in student_skill_names
    )

    # Core-skill mastery bonus
    core_skills = [s for s in career_skills if s.weight >= CORE_SKILL_THRESHOLD]
    core_total = sum(s.weight for s in core_skills)
    core_matched = sum(
        s.weight
        for s in core_skills
        if s.name.casefold().strip() in student_skill_names
    )
    core_ratio = core_matched / core_total if core_total > 0 else 0.0

    raw_ratio = matched_weight / total_weight if total_weight > 0 else 0.0
    bonus = CORE_MASTERY_BONUS * core_ratio
    skill_score = min(100.0, 100.0 * (raw_ratio + bonus))

    return round(skill_score, 1)


def compute_interest_score(
    career_interests: List[CareerInterestInput],
    student_interest_names: Set[str],
) -> float:
    """Compute normalized interest score (0-100)."""
    total_interest_weight = sum(i.weight for i in career_interests)
    matched_interest_weight = sum(
        i.weight
        for i in career_interests
        if i.name.casefold().strip() in student_interest_names
    )
    if total_interest_weight > 0.0:
        return round(100.0 * (matched_interest_weight / total_interest_weight), 1)
    return 0.0


def compute_subject_score(
    career_subjects: List[CareerSubjectInput],
    student_subject_names: Set[str],
) -> float:
    """Compute normalized academic subject score (0-100)."""
    total_subject_weight = sum(sub.weight for sub in career_subjects)
    matched_subject_weight = sum(
        sub.weight
        for sub in career_subjects
        if sub.name.casefold().strip() in student_subject_names
    )
    if total_subject_weight > 0.0:
        return round(100.0 * (matched_subject_weight / total_subject_weight), 1)
    return 0.0


def compute_experience_score(
    career_experience: str,
    student_experience: str,
) -> float:
    """Compute normalized experience fit score (0-100)."""
    if career_experience == "any":
        return EXPERIENCE_SCORE_TIERS["matched"]

    student_years = EXPERIENCE_YEARS_MAP.get(student_experience, 0.5)
    career_midpoint = EXPERIENCE_YEARS_MAP.get(career_experience, 0.5)

    if student_years >= career_midpoint:
        return EXPERIENCE_SCORE_TIERS["matched"]
    elif student_years >= (career_midpoint - 1.0):
        return EXPERIENCE_SCORE_TIERS["near"]
    else:
        return EXPERIENCE_SCORE_TIERS["low"]


def compute_final_score(
    skill_score: float,
    interest_score: float,
    subject_score: float,
    experience_score: float,
    student_has_at_least_one_skill: bool,
) -> float:
    """
    Compute final composite match score (0-100) with UX score floor.
    """
    final = (
        (skill_score * SKILL_WEIGHT)
        + (interest_score * INTEREST_WEIGHT)
        + (subject_score * SUBJECT_WEIGHT)
        + (experience_score * EXPERIENCE_WEIGHT)
    )

    if student_has_at_least_one_skill:
        final = max(final, MIN_FINAL_SCORE)

    return round(max(0.0, min(100.0, final)), 1)


def determine_match_tier(match_percent: float) -> Literal["strong", "moderate", "explore"]:
    """
    Tiers reflect real junior-market fit, not linear percentage:
    - strong (>=65): has the core stack (e.g. Frontend, Full Stack); can close gaps in weeks
    - moderate (45-65): has partial core; would need months
    - explore (<45): different domain — not a realistic short-term path
    The math stays honest; the labels match reality.
    """
    if match_percent >= 65.0:
        return "strong"
    elif match_percent >= 45.0:
        return "moderate"
    else:
        return "explore"


def calculate_career_recommendations(
    student: StudentInput,
    careers: List[CareerInput],
) -> List[CareerRecommendation]:
    """
    Score and rank a list of careers against a student profile using
    calibrated rule-based scoring across skills, interests, academic subjects,
    and work experience.
    """
    # Build casefolded, trimmed lookup sets for student attributes
    student_skills_set: Set[str] = {
        s.casefold().strip() for s in student.skills if s.strip()
    }
    student_interests_set: Set[str] = {
        i.casefold().strip() for i in student.interests if i.strip()
    }
    student_subjects_set: Set[str] = {
        sub.casefold().strip() for sub in student.subjects if sub.strip()
    }

    student_has_at_least_one_skill = len(student.skills) > 0

    recommendations: List[CareerRecommendation] = []

    for career in careers:
        # 1. Skill Score with Core Mastery Bonus
        skill_score = compute_skill_score(career.skills, student_skills_set)

        # 2. Interest Score
        interest_score = compute_interest_score(career.interests, student_interests_set)

        # 3. Subject Score
        subject_score = compute_subject_score(career.subjects, student_subjects_set)

        # 4. Experience Score
        experience_score = compute_experience_score(
            career.typical_work_experience,
            student.experience,
        )

        # Final Composite Match Score with UX floor
        match_percent = compute_final_score(
            skill_score,
            interest_score,
            subject_score,
            experience_score,
            student_has_at_least_one_skill,
        )

        match_tier = determine_match_tier(match_percent)

        # Matched Skills (career skills student has, sorted by weight DESC, top N)
        matched_skill_items: List[Tuple[str, float]] = []
        for skill in career.skills:
            if skill.name.casefold().strip() in student_skills_set:
                matched_skill_items.append((skill.name.strip(), skill.weight))

        matched_skill_items.sort(key=lambda item: (-item[1], item[0]))
        matched_skills: List[str] = [
            item[0] for item in matched_skill_items[:MAX_MATCHED_SKILLS]
        ]

        # Missing Skills (only is_missing_highlight=true skills student lacks, top N)
        missing_skill_items: List[MissingSkill] = []
        for skill in career.skills:
            if skill.is_missing_highlight:
                if skill.name.casefold().strip() not in student_skills_set:
                    missing_skill_items.append(
                        MissingSkill(
                            name=skill.name.strip(),
                            weight=skill.weight,
                            category=skill.category,
                        )
                    )

        missing_skill_items.sort(key=lambda s: (-s.weight, s.name))
        missing_skills = missing_skill_items[:MAX_MISSING_SKILLS]

        # Gap Summary (all skills student lacks regardless of highlight, split into core vs secondary)
        missing_core_items: List[Tuple[str, float]] = []
        missing_secondary_items: List[Tuple[str, float]] = []

        for skill in career.skills:
            if skill.name.casefold().strip() not in student_skills_set:
                if skill.weight >= CORE_SKILL_THRESHOLD:
                    missing_core_items.append((skill.name.strip(), skill.weight))
                else:
                    missing_secondary_items.append((skill.name.strip(), skill.weight))

        missing_core_items.sort(key=lambda s: (-s[1], s[0]))
        missing_secondary_items.sort(key=lambda s: (-s[1], s[0]))

        gap_summary = GapSummary(
            core_gaps=[s[0] for s in missing_core_items],
            secondary_gaps=[s[0] for s in missing_secondary_items],
            core_gap_count=len(missing_core_items),
            secondary_gap_count=len(missing_secondary_items),
        )

        sub_scores = SubScores(
            skills=skill_score,
            interests=interest_score,
            subjects=subject_score,
            experience=experience_score,
        )

        recommendations.append(
            CareerRecommendation(
                career_id=career.id,
                career_title=career.title,
                rank=1,  # Placeholder, assigned post-sorting
                match_percent=match_percent,
                match_tier=match_tier,
                sub_scores=sub_scores,
                matched_skills=matched_skills,
                missing_skills=missing_skills,
                gap_summary=gap_summary,
            )
        )

    # Ranking: sort by match_percent DESC, then skill sub-score DESC, then id
    recommendations.sort(
        key=lambda r: (-r.match_percent, -r.sub_scores.skills, r.career_id)
    )

    for rank_idx, rec in enumerate(recommendations, start=1):
        rec.rank = rank_idx

    return recommendations
