import json
from pathlib import Path


def main():
    payload_path = Path(__file__).parent / "sample_payload.json"
    
    if not payload_path.exists():
        print(f"Error: {payload_path} not found.")
        return

    with open(payload_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    careers = data.get("careers", [])
    # Sort careers alphabetically by title
    sorted_careers = sorted(careers, key=lambda c: c.get("title", "").lower())

    zero_interests_count = 0
    zero_subjects_count = 0

    print("=" * 70)
    print("CAREER DATA DIAGNOSTIC REPORT")
    print(f"Total careers loaded: {len(sorted_careers)}")
    print("=" * 70)
    print()

    for career in sorted_careers:
        title = career.get("title", "Unknown Title")
        exp = career.get("typical_work_experience", "unspecified")
        skills = career.get("skills", [])
        interests = career.get("interests", [])
        subjects = career.get("subjects", [])

        if not interests:
            zero_interests_count += 1
        if not subjects:
            zero_subjects_count += 1

        print(f"Career: {title} (typical_work_experience: {exp})")
        
        # Skills
        if skills:
            skills_str = ", ".join(f"{s.get('name')}:{s.get('weight')}" for s in skills)
            print(f"  Skills ({len(skills)}): {skills_str}")
        else:
            print("  Skills: NONE")

        # Interests
        if interests:
            interests_str = ", ".join(f"{i.get('name')}:{i.get('weight')}" for i in interests)
            print(f"  Interests ({len(interests)}): {interests_str}")
        else:
            print("  Interests: NONE")

        # Subjects
        if subjects:
            subjects_str = ", ".join(f"{sub.get('name')}:{sub.get('weight')}" for sub in subjects)
            print(f"  Subjects ({len(subjects)}): {subjects_str}")
        else:
            print("  Subjects: NONE")

        print("-" * 70)

    print()
    print("=" * 70)
    print("SUMMARY")
    print(f"Total careers: {len(sorted_careers)}")
    print(f"Careers with zero interests: {zero_interests_count}")
    print(f"Careers with zero subjects:  {zero_subjects_count}")
    print("=" * 70)


if __name__ == "__main__":
    main()

