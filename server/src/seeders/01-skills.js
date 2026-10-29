import Skill from '../models/Skill.js';

export const skillsData = [
  // Languages
  { name: 'JavaScript', category: 'language' },
  { name: 'TypeScript', category: 'language' },
  { name: 'Python', category: 'language' },
  { name: 'Java', category: 'language' },
  { name: 'C++', category: 'language' },
  { name: 'C#', category: 'language' },
  { name: 'Go', category: 'language' },
  { name: 'Rust', category: 'language' },
  { name: 'PHP', category: 'language' },
  { name: 'Ruby', category: 'language' },
  { name: 'Kotlin', category: 'language' },
  { name: 'Swift', category: 'language' },
  { name: 'SQL', category: 'language' },

  // Frontend
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Vue', category: 'frontend' },
  { name: 'Angular', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Redux', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Material UI', category: 'frontend' },
  { name: 'Svelte', category: 'frontend' },

  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'NestJS', category: 'backend' },
  { name: 'Django', category: 'backend' },
  { name: 'Flask', category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'Spring Boot', category: 'backend' },
  { name: 'Laravel', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'REST API', category: 'backend' },

  // Database
  { name: 'MySQL', category: 'database' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Redis', category: 'database' },
  { name: 'SQLite', category: 'database' },
  { name: 'Sequelize', category: 'database' },
  { name: 'Prisma', category: 'database' },

  // DevOps
  { name: 'Docker', category: 'devops' },
  { name: 'Kubernetes', category: 'devops' },
  { name: 'Git', category: 'devops' },
  { name: 'GitHub Actions', category: 'devops' },
  { name: 'CI/CD', category: 'devops' },
  { name: 'Nginx', category: 'devops' },
  { name: 'Linux', category: 'devops' },
  { name: 'Terraform', category: 'devops' },

  // Cloud
  { name: 'AWS', category: 'cloud' },
  { name: 'Azure', category: 'cloud' },
  { name: 'GCP', category: 'cloud' },
  { name: 'Firebase', category: 'cloud' },
  { name: 'Vercel', category: 'cloud' },

  // AI/ML
  { name: 'Machine Learning', category: 'ai_ml' },
  { name: 'Deep Learning', category: 'ai_ml' },
  { name: 'TensorFlow', category: 'ai_ml' },
  { name: 'PyTorch', category: 'ai_ml' },
  { name: 'Scikit-learn', category: 'ai_ml' },
  { name: 'Pandas', category: 'ai_ml' },
  { name: 'NumPy', category: 'ai_ml' },
  { name: 'NLP', category: 'ai_ml' },
  { name: 'Computer Vision', category: 'ai_ml' },
  { name: 'LLM APIs', category: 'ai_ml' },

  // Design
  { name: 'UI/UX Design', category: 'design' },
  { name: 'Figma', category: 'design' },
  { name: 'Adobe XD', category: 'design' },
  { name: 'Wireframing', category: 'design' },
  { name: 'Prototyping', category: 'design' },

  // Testing
  { name: 'Unit Testing', category: 'testing' },
  { name: 'Jest', category: 'testing' },
  { name: 'Cypress', category: 'testing' },
  { name: 'Selenium', category: 'testing' },
  { name: 'Postman', category: 'testing' },

  // Soft Skills
  { name: 'Communication', category: 'soft' },
  { name: 'Teamwork', category: 'soft' },
  { name: 'Problem Solving', category: 'soft' },
  { name: 'Time Management', category: 'soft' },
  { name: 'Leadership', category: 'soft' },

  // Other / Architecture
  { name: 'Agile', category: 'other' },
  { name: 'Scrum', category: 'other' },
  { name: 'Data Structures', category: 'other' },
  { name: 'Algorithms', category: 'other' },
  { name: 'System Design', category: 'other' },
  { name: 'Microservices', category: 'other' },
  { name: 'WebSockets', category: 'other' },
  { name: 'Payment Gateway Integration', category: 'other' },
  { name: 'Message Queues', category: 'other' },
];

export async function seed(sequelize) {
  let createdCount = 0;
  let skippedCount = 0;

  for (const item of skillsData) {
    const [record, created] = await Skill.findOrCreate({
      where: { name: item.name },
      defaults: item,
    });

    if (created) {
      createdCount++;
    } else {
      skippedCount++;
    }
  }

  console.log(`[01-skills] Skills seeder complete: ${createdCount} created, ${skippedCount} skipped (total ${skillsData.length})`);
  return { created: createdCount, skipped: skippedCount, total: skillsData.length };
}

export default seed;
