import Career from '../models/Career.js';
import AcademicSubject from '../models/AcademicSubject.js';
import CareerSubject from '../models/CareerSubject.js';

export const careerSubjectsMatrix = [
  // 1. Full Stack Developer
  {
    career: 'Full Stack Developer',
    subjects: [
      { subject: 'DBMS', weight: 2.0 },
      { subject: 'Software Engineering', weight: 2.0 },
      { subject: 'Data Structures', weight: 1.5 },
      { subject: 'Computer Networks', weight: 1.0 },
    ],
  },

  // 2. Frontend Developer
  {
    career: 'Frontend Developer',
    subjects: [
      { subject: 'Software Engineering', weight: 2.0 },
      { subject: 'Data Structures', weight: 1.5 },
      { subject: 'Computer Networks', weight: 1.0 },
    ],
  },

  // 3. Backend Developer
  {
    career: 'Backend Developer',
    subjects: [
      { subject: 'DBMS', weight: 2.0 },
      { subject: 'Data Structures', weight: 2.0 },
      { subject: 'Computer Networks', weight: 1.5 },
      { subject: 'Operating Systems', weight: 1.5 },
    ],
  },

  // 4. Software Engineer
  {
    career: 'Software Engineer',
    subjects: [
      { subject: 'Data Structures', weight: 2.0 },
      { subject: 'Software Engineering', weight: 2.0 },
      { subject: 'Operating Systems', weight: 1.5 },
      { subject: 'Mathematics', weight: 1.0 },
    ],
  },

  // 5. Mobile App Developer
  {
    career: 'Mobile App Developer',
    subjects: [
      { subject: 'Software Engineering', weight: 2.0 },
      { subject: 'Data Structures', weight: 1.5 },
      { subject: 'Computer Networks', weight: 1.0 },
    ],
  },

  // 6. Data Analyst
  {
    career: 'Data Analyst',
    subjects: [
      { subject: 'Statistics', weight: 2.0 },
      { subject: 'DBMS', weight: 2.0 },
      { subject: 'Mathematics', weight: 1.5 },
    ],
  },

  // 7. Data Scientist
  {
    career: 'Data Scientist',
    subjects: [
      { subject: 'Statistics', weight: 2.0 },
      { subject: 'Mathematics', weight: 2.0 },
      { subject: 'Artificial Intelligence', weight: 1.5 },
      { subject: 'DBMS', weight: 1.0 },
    ],
  },

  // 8. Machine Learning Engineer
  {
    career: 'Machine Learning Engineer',
    subjects: [
      { subject: 'Artificial Intelligence', weight: 2.0 },
      { subject: 'Mathematics', weight: 2.0 },
      { subject: 'Statistics', weight: 2.0 },
      { subject: 'Data Structures', weight: 1.5 },
    ],
  },

  // 9. AI Engineer
  {
    career: 'AI Engineer',
    subjects: [
      { subject: 'Artificial Intelligence', weight: 2.0 },
      { subject: 'Mathematics', weight: 1.5 },
      { subject: 'Statistics', weight: 1.5 },
      { subject: 'Data Structures', weight: 1.0 },
    ],
  },

  // 10. DevOps Engineer
  {
    career: 'DevOps Engineer',
    subjects: [
      { subject: 'Operating Systems', weight: 2.0 },
      { subject: 'Computer Networks', weight: 2.0 },
      { subject: 'Cloud Computing', weight: 2.0 },
    ],
  },

  // 11. Cloud Engineer
  {
    career: 'Cloud Engineer',
    subjects: [
      { subject: 'Cloud Computing', weight: 2.0 },
      { subject: 'Distributed Systems', weight: 2.0 },
      { subject: 'Computer Networks', weight: 1.5 },
      { subject: 'Operating Systems', weight: 1.5 },
    ],
  },

  // 12. Site Reliability Engineer
  {
    career: 'Site Reliability Engineer',
    subjects: [
      { subject: 'Distributed Systems', weight: 2.0 },
      { subject: 'Operating Systems', weight: 2.0 },
      { subject: 'Computer Networks', weight: 1.5 },
      { subject: 'Cloud Computing', weight: 1.5 },
    ],
  },

  // 13. Security Engineer
  {
    career: 'Security Engineer',
    subjects: [
      { subject: 'Computer Networks', weight: 2.0 },
      { subject: 'Operating Systems', weight: 2.0 },
      { subject: 'Mathematics', weight: 1.5 },
    ],
  },

  // 14. QA / Test Automation Engineer
  {
    career: 'QA / Test Automation Engineer',
    subjects: [
      { subject: 'Software Engineering', weight: 2.0 },
      { subject: 'Data Structures', weight: 1.5 },
      { subject: 'DBMS', weight: 1.0 },
    ],
  },

  // 15. UI/UX Designer
  {
    career: 'UI/UX Designer',
    subjects: [
      { subject: 'Software Engineering', weight: 1.5 },
      { subject: 'Computer Networks', weight: 0.5 },
    ],
  },

  // 16. Product Manager
  {
    career: 'Product Manager',
    subjects: [
      { subject: 'Software Engineering', weight: 2.0 },
      { subject: 'DBMS', weight: 1.0 },
      { subject: 'Statistics', weight: 1.0 },
    ],
  },

  // 17. Database Administrator
  {
    career: 'Database Administrator',
    subjects: [
      { subject: 'DBMS', weight: 2.0 },
      { subject: 'Operating Systems', weight: 1.5 },
      { subject: 'Distributed Systems', weight: 1.5 },
      { subject: 'Computer Networks', weight: 1.0 },
    ],
  },

  // 18. Data Engineer
  {
    career: 'Data Engineer',
    subjects: [
      { subject: 'DBMS', weight: 2.0 },
      { subject: 'Distributed Systems', weight: 2.0 },
      { subject: 'Data Structures', weight: 1.5 },
      { subject: 'Cloud Computing', weight: 1.5 },
    ],
  },

  // 19. Blockchain Developer
  {
    career: 'Blockchain Developer',
    subjects: [
      { subject: 'Distributed Systems', weight: 2.0 },
      { subject: 'Data Structures', weight: 2.0 },
      { subject: 'Mathematics', weight: 1.5 },
      { subject: 'Computer Networks', weight: 1.5 },
    ],
  },

  // 20. Game Developer
  {
    career: 'Game Developer',
    subjects: [
      { subject: 'Physics', weight: 2.0 },
      { subject: 'Mathematics', weight: 2.0 },
      { subject: 'Data Structures', weight: 1.5 },
    ],
  },

  // 21. Embedded Systems Engineer
  {
    career: 'Embedded Systems Engineer',
    subjects: [
      { subject: 'Electronics', weight: 2.0 },
      { subject: 'Operating Systems', weight: 2.0 },
      { subject: 'Physics', weight: 1.5 },
    ],
  },

  // 22. Business Intelligence Analyst
  {
    career: 'Business Intelligence Analyst',
    subjects: [
      { subject: 'DBMS', weight: 2.0 },
      { subject: 'Statistics', weight: 2.0 },
      { subject: 'Mathematics', weight: 1.0 },
    ],
  },

  // 23. Technical Writer
  {
    career: 'Technical Writer',
    subjects: [
      { subject: 'Software Engineering', weight: 2.0 },
      { subject: 'Computer Networks', weight: 1.0 },
    ],
  },

  // 24. Solutions Architect
  {
    career: 'Solutions Architect',
    subjects: [
      { subject: 'Distributed Systems', weight: 2.0 },
      { subject: 'Cloud Computing', weight: 2.0 },
      { subject: 'Software Engineering', weight: 1.5 },
      { subject: 'Computer Networks', weight: 1.5 },
    ],
  },

  // 25. Systems Analyst
  {
    career: 'Systems Analyst',
    subjects: [
      { subject: 'Software Engineering', weight: 2.0 },
      { subject: 'DBMS', weight: 1.5 },
      { subject: 'Computer Networks', weight: 1.0 },
    ],
  },

  // 26. Robotics Engineer
  {
    career: 'Robotics Engineer',
    subjects: [
      { subject: 'Electronics', weight: 2.0 },
      { subject: 'Physics', weight: 2.0 },
      { subject: 'Artificial Intelligence', weight: 1.5 },
      { subject: 'Operating Systems', weight: 1.0 },
    ],
  },

  // 27. Computer Vision Engineer
  {
    career: 'Computer Vision Engineer',
    subjects: [
      { subject: 'Artificial Intelligence', weight: 2.0 },
      { subject: 'Mathematics', weight: 2.0 },
      { subject: 'Physics', weight: 1.5 },
      { subject: 'Statistics', weight: 1.0 },
    ],
  },

  // 28. NLP Engineer
  {
    career: 'NLP Engineer',
    subjects: [
      { subject: 'Artificial Intelligence', weight: 2.0 },
      { subject: 'Statistics', weight: 2.0 },
      { subject: 'Mathematics', weight: 1.5 },
      { subject: 'Data Structures', weight: 1.0 },
    ],
  },
];

export async function seed(sequelize) {
  let createdCount = 0;
  let skippedCount = 0;
  let totalLinks = 0;

  const careers = await Career.findAll();
  const careerMap = new Map(careers.map((c) => [c.title, c.id]));

  const subjects = await AcademicSubject.findAll();
  const subjectMap = new Map(subjects.map((s) => [s.name, s.id]));

  for (const group of careerSubjectsMatrix) {
    const careerId = careerMap.get(group.career);
    if (!careerId) {
      console.warn(`[07-career-subjects] Career not found: "${group.career}"`);
      continue;
    }

    for (const item of group.subjects) {
      totalLinks++;
      const subjectId = subjectMap.get(item.subject);
      if (!subjectId) {
        console.warn(`[07-career-subjects] AcademicSubject not found: "${item.subject}" for career "${group.career}"`);
        continue;
      }

      const [record, created] = await CareerSubject.findOrCreate({
        where: {
          career_id: careerId,
          subject_id: subjectId,
        },
        defaults: {
          career_id: careerId,
          subject_id: subjectId,
          weight: item.weight,
        },
      });

      if (created) {
        createdCount++;
      } else {
        skippedCount++;
      }
    }
  }

  console.log(`[07-career-subjects] Career-Subjects seeder complete: ${createdCount} created, ${skippedCount} skipped (total ${totalLinks})`);
  return { created: createdCount, skipped: skippedCount, total: totalLinks };
}

export default seed;
