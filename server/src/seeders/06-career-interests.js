import Career from '../models/Career.js';
import Interest from '../models/Interest.js';
import CareerInterest from '../models/CareerInterest.js';

export const careerInterestsMatrix = [
  // 1. Full Stack Developer
  {
    career: 'Full Stack Developer',
    interests: [
      { interest: 'web', weight: 2.0 },
      { interest: 'product', weight: 1.0 },
      { interest: 'systems', weight: 0.5 },
    ],
  },

  // 2. Frontend Developer
  {
    career: 'Frontend Developer',
    interests: [
      { interest: 'web', weight: 2.0 },
      { interest: 'design', weight: 1.5 },
      { interest: 'product', weight: 0.5 },
    ],
  },

  // 3. Backend Developer
  {
    career: 'Backend Developer',
    interests: [
      { interest: 'systems', weight: 2.0 },
      { interest: 'web', weight: 1.5 },
      { interest: 'cloud', weight: 1.0 },
    ],
  },

  // 4. Software Engineer
  {
    career: 'Software Engineer',
    interests: [
      { interest: 'systems', weight: 2.0 },
      { interest: 'web', weight: 1.0 },
      { interest: 'product', weight: 1.0 },
    ],
  },

  // 5. Mobile App Developer
  {
    career: 'Mobile App Developer',
    interests: [
      { interest: 'mobile', weight: 2.0 },
      { interest: 'design', weight: 1.5 },
      { interest: 'product', weight: 1.0 },
    ],
  },

  // 6. Data Analyst
  {
    career: 'Data Analyst',
    interests: [
      { interest: 'data', weight: 2.0 },
      { interest: 'product', weight: 1.0 },
      { interest: 'research', weight: 1.0 },
    ],
  },

  // 7. Data Scientist
  {
    career: 'Data Scientist',
    interests: [
      { interest: 'data', weight: 2.0 },
      { interest: 'research', weight: 2.0 },
      { interest: 'ai', weight: 1.5 },
    ],
  },

  // 8. Machine Learning Engineer
  {
    career: 'Machine Learning Engineer',
    interests: [
      { interest: 'ai', weight: 2.0 },
      { interest: 'data', weight: 1.5 },
      { interest: 'systems', weight: 1.0 },
    ],
  },

  // 9. AI Engineer
  {
    career: 'AI Engineer',
    interests: [
      { interest: 'ai', weight: 2.0 },
      { interest: 'research', weight: 1.5 },
      { interest: 'cloud', weight: 1.0 },
    ],
  },

  // 10. DevOps Engineer
  {
    career: 'DevOps Engineer',
    interests: [
      { interest: 'systems', weight: 2.0 },
      { interest: 'cloud', weight: 2.0 },
      { interest: 'security', weight: 1.0 },
    ],
  },

  // 11. Cloud Engineer
  {
    career: 'Cloud Engineer',
    interests: [
      { interest: 'cloud', weight: 2.0 },
      { interest: 'systems', weight: 1.5 },
      { interest: 'security', weight: 1.0 },
    ],
  },

  // 12. Site Reliability Engineer
  {
    career: 'Site Reliability Engineer',
    interests: [
      { interest: 'systems', weight: 2.0 },
      { interest: 'cloud', weight: 1.5 },
      { interest: 'security', weight: 1.5 },
    ],
  },

  // 13. Security Engineer
  {
    career: 'Security Engineer',
    interests: [
      { interest: 'security', weight: 2.0 },
      { interest: 'systems', weight: 1.5 },
      { interest: 'cloud', weight: 1.0 },
    ],
  },

  // 14. QA / Test Automation Engineer
  {
    career: 'QA / Test Automation Engineer',
    interests: [
      { interest: 'product', weight: 1.5 },
      { interest: 'systems', weight: 1.5 },
      { interest: 'web', weight: 1.0 },
    ],
  },

  // 15. UI/UX Designer
  {
    career: 'UI/UX Designer',
    interests: [
      { interest: 'design', weight: 2.0 },
      { interest: 'product', weight: 1.5 },
      { interest: 'web', weight: 1.0 },
    ],
  },

  // 16. Product Manager
  {
    career: 'Product Manager',
    interests: [
      { interest: 'product', weight: 2.0 },
      { interest: 'design', weight: 1.0 },
      { interest: 'data', weight: 1.0 },
    ],
  },

  // 17. Database Administrator
  {
    career: 'Database Administrator',
    interests: [
      { interest: 'data', weight: 2.0 },
      { interest: 'systems', weight: 2.0 },
      { interest: 'security', weight: 1.0 },
    ],
  },

  // 18. Data Engineer
  {
    career: 'Data Engineer',
    interests: [
      { interest: 'data', weight: 2.0 },
      { interest: 'systems', weight: 1.5 },
      { interest: 'cloud', weight: 1.5 },
    ],
  },

  // 19. Blockchain Developer
  {
    career: 'Blockchain Developer',
    interests: [
      { interest: 'systems', weight: 2.0 },
      { interest: 'security', weight: 1.5 },
      { interest: 'research', weight: 1.0 },
    ],
  },

  // 20. Game Developer
  {
    career: 'Game Developer',
    interests: [
      { interest: 'systems', weight: 2.0 },
      { interest: 'design', weight: 1.5 },
      { interest: 'mobile', weight: 1.0 },
    ],
  },

  // 21. Embedded Systems Engineer
  {
    career: 'Embedded Systems Engineer',
    interests: [
      { interest: 'systems', weight: 2.0 },
      { interest: 'research', weight: 1.0 },
      { interest: 'security', weight: 0.5 },
    ],
  },

  // 22. Business Intelligence Analyst
  {
    career: 'Business Intelligence Analyst',
    interests: [
      { interest: 'data', weight: 2.0 },
      { interest: 'product', weight: 1.5 },
      { interest: 'research', weight: 0.5 },
    ],
  },

  // 23. Technical Writer
  {
    career: 'Technical Writer',
    interests: [
      { interest: 'product', weight: 1.5 },
      { interest: 'research', weight: 1.0 },
      { interest: 'web', weight: 1.0 },
    ],
  },

  // 24. Solutions Architect
  {
    career: 'Solutions Architect',
    interests: [
      { interest: 'cloud', weight: 2.0 },
      { interest: 'systems', weight: 2.0 },
      { interest: 'security', weight: 1.5 },
      { interest: 'product', weight: 1.0 },
    ],
  },

  // 25. Systems Analyst
  {
    career: 'Systems Analyst',
    interests: [
      { interest: 'systems', weight: 2.0 },
      { interest: 'product', weight: 1.5 },
      { interest: 'data', weight: 1.0 },
    ],
  },

  // 26. Robotics Engineer
  {
    career: 'Robotics Engineer',
    interests: [
      { interest: 'systems', weight: 2.0 },
      { interest: 'ai', weight: 1.5 },
      { interest: 'research', weight: 1.5 },
    ],
  },

  // 27. Computer Vision Engineer
  {
    career: 'Computer Vision Engineer',
    interests: [
      { interest: 'ai', weight: 2.0 },
      { interest: 'research', weight: 1.5 },
      { interest: 'data', weight: 1.0 },
    ],
  },

  // 28. NLP Engineer
  {
    career: 'NLP Engineer',
    interests: [
      { interest: 'ai', weight: 2.0 },
      { interest: 'research', weight: 1.5 },
      { interest: 'data', weight: 1.0 },
    ],
  },
];

export async function seed(sequelize) {
  let createdCount = 0;
  let skippedCount = 0;
  let totalLinks = 0;

  const careers = await Career.findAll();
  const careerMap = new Map(careers.map((c) => [c.title, c.id]));

  const interests = await Interest.findAll();
  const interestMap = new Map(interests.map((i) => [i.name, i.id]));

  for (const group of careerInterestsMatrix) {
    const careerId = careerMap.get(group.career);
    if (!careerId) {
      console.warn(`[06-career-interests] Career not found: "${group.career}"`);
      continue;
    }

    for (const item of group.interests) {
      totalLinks++;
      const interestId = interestMap.get(item.interest);
      if (!interestId) {
        console.warn(`[06-career-interests] Interest not found: "${item.interest}" for career "${group.career}"`);
        continue;
      }

      const [record, created] = await CareerInterest.findOrCreate({
        where: {
          career_id: careerId,
          interest_id: interestId,
        },
        defaults: {
          career_id: careerId,
          interest_id: interestId,
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

  console.log(`[06-career-interests] Career-Interests seeder complete: ${createdCount} created, ${skippedCount} skipped (total ${totalLinks})`);
  return { created: createdCount, skipped: skippedCount, total: totalLinks };
}

export default seed;
