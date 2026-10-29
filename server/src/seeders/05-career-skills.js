import Career from '../models/Career.js';
import Skill from '../models/Skill.js';
import CareerSkill from '../models/CareerSkill.js';

export const careerSkillsMatrix = [
  // 1. Full Stack Developer
  {
    career: 'Full Stack Developer',
    skills: [
      { skill: 'JavaScript', weight: 3.0 },
      { skill: 'React', weight: 2.5 },
      { skill: 'Node.js', weight: 2.5 },
      { skill: 'Express', weight: 2.0 },
      { skill: 'SQL', weight: 2.0 },
      { skill: 'HTML', weight: 2.0 },
      { skill: 'CSS', weight: 2.0 },
      { skill: 'Git', weight: 2.0 },
      { skill: 'REST API', weight: 2.0 },
      { skill: 'Docker', weight: 1.5 },
      { skill: 'MongoDB', weight: 1.5 },
      { skill: 'Postman', weight: 0.5 },
    ],
  },

  // 2. Frontend Developer
  {
    career: 'Frontend Developer',
    skills: [
      { skill: 'HTML', weight: 3.0 },
      { skill: 'CSS', weight: 3.0 },
      { skill: 'JavaScript', weight: 3.0 },
      { skill: 'React', weight: 2.5 },
      { skill: 'TypeScript', weight: 2.5 },
      { skill: 'Tailwind CSS', weight: 2.0 },
      { skill: 'Material UI', weight: 1.5 },
      { skill: 'Git', weight: 2.0 },
      { skill: 'REST API', weight: 1.5 },
      { skill: 'UI/UX Design', weight: 1.0 },
      { skill: 'Jest', weight: 0.5 },
    ],
  },

  // 3. Backend Developer
  {
    career: 'Backend Developer',
    skills: [
      { skill: 'Node.js', weight: 3.0 },
      { skill: 'Express', weight: 2.5 },
      { skill: 'SQL', weight: 2.5 },
      { skill: 'PostgreSQL', weight: 2.5 },
      { skill: 'REST API', weight: 2.5 },
      { skill: 'Redis', weight: 2.0 },
      { skill: 'System Design', weight: 2.0 },
      { skill: 'Docker', weight: 2.0 },
      { skill: 'Git', weight: 2.0 },
      { skill: 'Microservices', weight: 1.5 },
      { skill: 'Unit Testing', weight: 1.0 },
      { skill: 'Postman', weight: 0.5 },
    ],
  },

  // 4. Software Engineer
  {
    career: 'Software Engineer',
    skills: [
      { skill: 'Data Structures', weight: 3.0 },
      { skill: 'Algorithms', weight: 3.0 },
      { skill: 'Java', weight: 2.5 },
      { skill: 'C++', weight: 2.5 },
      { skill: 'Problem Solving', weight: 2.5 },
      { skill: 'Git', weight: 2.0 },
      { skill: 'System Design', weight: 2.0 },
      { skill: 'Unit Testing', weight: 2.0 },
      { skill: 'SQL', weight: 1.5 },
      { skill: 'CI/CD', weight: 1.0 },
      { skill: 'Agile', weight: 0.5 },
    ],
  },

  // 5. Mobile App Developer
  {
    career: 'Mobile App Developer',
    skills: [
      { skill: 'Kotlin', weight: 3.0 },
      { skill: 'Swift', weight: 3.0 },
      { skill: 'React', weight: 2.0 },
      { skill: 'JavaScript', weight: 2.0 },
      { skill: 'Firebase', weight: 2.0 },
      { skill: 'REST API', weight: 2.0 },
      { skill: 'Git', weight: 2.0 },
      { skill: 'UI/UX Design', weight: 1.5 },
      { skill: 'Unit Testing', weight: 1.0 },
      { skill: 'Figma', weight: 0.5 },
    ],
  },

  // 6. Data Analyst
  {
    career: 'Data Analyst',
    skills: [
      { skill: 'SQL', weight: 3.0 },
      { skill: 'Python', weight: 2.5 },
      { skill: 'Pandas', weight: 2.5 },
      { skill: 'NumPy', weight: 2.0 },
      { skill: 'Communication', weight: 2.0 },
      { skill: 'Problem Solving', weight: 2.0 },
      { skill: 'PostgreSQL', weight: 1.5 },
      { skill: 'Scikit-learn', weight: 1.0 },
      { skill: 'Git', weight: 0.5 },
    ],
  },

  // 7. Data Scientist
  {
    career: 'Data Scientist',
    skills: [
      { skill: 'Python', weight: 3.0 },
      { skill: 'Machine Learning', weight: 3.0 },
      { skill: 'Pandas', weight: 2.5 },
      { skill: 'NumPy', weight: 2.5 },
      { skill: 'Scikit-learn', weight: 2.5 },
      { skill: 'Deep Learning', weight: 2.0 },
      { skill: 'SQL', weight: 2.0 },
      { skill: 'Problem Solving', weight: 2.0 },
      { skill: 'Git', weight: 1.5 },
      { skill: 'Docker', weight: 1.0 },
      { skill: 'Communication', weight: 0.5 },
    ],
  },

  // 8. Machine Learning Engineer
  {
    career: 'Machine Learning Engineer',
    skills: [
      { skill: 'Python', weight: 3.0 },
      { skill: 'Machine Learning', weight: 3.0 },
      { skill: 'TensorFlow', weight: 2.5 },
      { skill: 'PyTorch', weight: 2.5 },
      { skill: 'Deep Learning', weight: 2.5 },
      { skill: 'Scikit-learn', weight: 2.0 },
      { skill: 'NumPy', weight: 2.0 },
      { skill: 'Pandas', weight: 2.0 },
      { skill: 'Docker', weight: 2.0 },
      { skill: 'SQL', weight: 1.5 },
      { skill: 'CI/CD', weight: 1.0 },
      { skill: 'Linux', weight: 0.5 },
    ],
  },

  // 9. AI Engineer
  {
    career: 'AI Engineer',
    skills: [
      { skill: 'Python', weight: 3.0 },
      { skill: 'LLM APIs', weight: 3.0 },
      { skill: 'Deep Learning', weight: 2.5 },
      { skill: 'PyTorch', weight: 2.5 },
      { skill: 'NLP', weight: 2.5 },
      { skill: 'Machine Learning', weight: 2.5 },
      { skill: 'FastAPI', weight: 2.0 },
      { skill: 'Docker', weight: 2.0 },
      { skill: 'Redis', weight: 1.5 },
      { skill: 'Git', weight: 1.0 },
      { skill: 'Postman', weight: 0.5 },
    ],
  },

  // 10. DevOps Engineer
  {
    career: 'DevOps Engineer',
    skills: [
      { skill: 'Docker', weight: 3.0 },
      { skill: 'Kubernetes', weight: 3.0 },
      { skill: 'CI/CD', weight: 2.5 },
      { skill: 'Linux', weight: 2.5 },
      { skill: 'GitHub Actions', weight: 2.5 },
      { skill: 'Terraform', weight: 2.5 },
      { skill: 'AWS', weight: 2.0 },
      { skill: 'Git', weight: 2.0 },
      { skill: 'Nginx', weight: 1.5 },
      { skill: 'Python', weight: 1.0 },
      { skill: 'Agile', weight: 0.5 },
    ],
  },

  // 11. Cloud Engineer
  {
    career: 'Cloud Engineer',
    skills: [
      { skill: 'AWS', weight: 3.0 },
      { skill: 'Azure', weight: 2.5 },
      { skill: 'Terraform', weight: 2.5 },
      { skill: 'Linux', weight: 2.5 },
      { skill: 'Docker', weight: 2.0 },
      { skill: 'Kubernetes', weight: 2.0 },
      { skill: 'GCP', weight: 2.0 },
      { skill: 'CI/CD', weight: 1.5 },
      { skill: 'Git', weight: 1.5 },
      { skill: 'System Design', weight: 1.0 },
      { skill: 'Nginx', weight: 0.5 },
    ],
  },

  // 12. Site Reliability Engineer
  {
    career: 'Site Reliability Engineer',
    skills: [
      { skill: 'Linux', weight: 3.0 },
      { skill: 'Kubernetes', weight: 3.0 },
      { skill: 'Docker', weight: 2.5 },
      { skill: 'System Design', weight: 2.5 },
      { skill: 'CI/CD', weight: 2.0 },
      { skill: 'Python', weight: 2.0 },
      { skill: 'Go', weight: 2.0 },
      { skill: 'Terraform', weight: 2.0 },
      { skill: 'Problem Solving', weight: 2.0 },
      { skill: 'Nginx', weight: 1.5 },
      { skill: 'Git', weight: 1.0 },
      { skill: 'Scrum', weight: 0.5 },
    ],
  },

  // 13. Security Engineer
  {
    career: 'Security Engineer',
    skills: [
      { skill: 'Linux', weight: 3.0 },
      { skill: 'Problem Solving', weight: 2.5 },
      { skill: 'System Design', weight: 2.0 },
      { skill: 'Python', weight: 2.0 },
      { skill: 'Docker', weight: 2.0 },
      { skill: 'AWS', weight: 2.0 },
      { skill: 'REST API', weight: 1.5 },
      { skill: 'Git', weight: 1.5 },
      { skill: 'Postman', weight: 1.0 },
      { skill: 'Communication', weight: 1.0 },
      { skill: 'SQL', weight: 0.5 },
    ],
  },

  // 14. QA / Test Automation Engineer
  {
    career: 'QA / Test Automation Engineer',
    skills: [
      { skill: 'Unit Testing', weight: 3.0 },
      { skill: 'Selenium', weight: 3.0 },
      { skill: 'Cypress', weight: 2.5 },
      { skill: 'Jest', weight: 2.5 },
      { skill: 'Postman', weight: 2.5 },
      { skill: 'JavaScript', weight: 2.0 },
      { skill: 'Python', weight: 2.0 },
      { skill: 'Git', weight: 2.0 },
      { skill: 'CI/CD', weight: 1.5 },
      { skill: 'Agile', weight: 1.0 },
      { skill: 'Scrum', weight: 0.5 },
    ],
  },

  // 15. UI/UX Designer
  {
    career: 'UI/UX Designer',
    skills: [
      { skill: 'UI/UX Design', weight: 3.0 },
      { skill: 'Figma', weight: 3.0 },
      { skill: 'Wireframing', weight: 3.0 },
      { skill: 'Prototyping', weight: 2.5 },
      { skill: 'Adobe XD', weight: 2.0 },
      { skill: 'Communication', weight: 2.0 },
      { skill: 'Teamwork', weight: 1.5 },
      { skill: 'HTML', weight: 1.0 },
      { skill: 'CSS', weight: 1.0 },
      { skill: 'Agile', weight: 0.5 },
    ],
  },

  // 16. Product Manager
  {
    career: 'Product Manager',
    skills: [
      { skill: 'Agile', weight: 3.0 },
      { skill: 'Scrum', weight: 3.0 },
      { skill: 'Leadership', weight: 3.0 },
      { skill: 'Communication', weight: 3.0 },
      { skill: 'Problem Solving', weight: 2.5 },
      { skill: 'Time Management', weight: 2.5 },
      { skill: 'Teamwork', weight: 2.0 },
      { skill: 'Wireframing', weight: 1.5 },
      { skill: 'UI/UX Design', weight: 1.5 },
      { skill: 'SQL', weight: 0.5 },
    ],
  },

  // 17. Database Administrator
  {
    career: 'Database Administrator',
    skills: [
      { skill: 'SQL', weight: 3.0 },
      { skill: 'MySQL', weight: 3.0 },
      { skill: 'PostgreSQL', weight: 3.0 },
      { skill: 'Redis', weight: 2.5 },
      { skill: 'Linux', weight: 2.0 },
      { skill: 'System Design', weight: 2.0 },
      { skill: 'Problem Solving', weight: 2.0 },
      { skill: 'Docker', weight: 1.5 },
      { skill: 'MongoDB', weight: 1.5 },
      { skill: 'Git', weight: 0.5 },
    ],
  },

  // 18. Data Engineer
  {
    career: 'Data Engineer',
    skills: [
      { skill: 'Python', weight: 3.0 },
      { skill: 'SQL', weight: 3.0 },
      { skill: 'PostgreSQL', weight: 2.5 },
      { skill: 'Message Queues', weight: 2.5 },
      { skill: 'Docker', weight: 2.5 },
      { skill: 'Redis', weight: 2.0 },
      { skill: 'Linux', weight: 2.0 },
      { skill: 'Data Structures', weight: 2.0 },
      { skill: 'Git', weight: 1.5 },
      { skill: 'CI/CD', weight: 1.5 },
      { skill: 'NumPy', weight: 0.5 },
    ],
  },

  // 19. Blockchain Developer
  {
    career: 'Blockchain Developer',
    skills: [
      { skill: 'Rust', weight: 3.0 },
      { skill: 'Go', weight: 2.5 },
      { skill: 'C++', weight: 2.5 },
      { skill: 'Data Structures', weight: 2.5 },
      { skill: 'Algorithms', weight: 2.5 },
      { skill: 'JavaScript', weight: 2.0 },
      { skill: 'System Design', weight: 2.0 },
      { skill: 'Git', weight: 2.0 },
      { skill: 'Unit Testing', weight: 1.5 },
      { skill: 'Linux', weight: 0.5 },
    ],
  },

  // 20. Game Developer
  {
    career: 'Game Developer',
    skills: [
      { skill: 'C++', weight: 3.0 },
      { skill: 'C#', weight: 3.0 },
      { skill: 'Algorithms', weight: 2.5 },
      { skill: 'Data Structures', weight: 2.5 },
      { skill: 'Problem Solving', weight: 2.5 },
      { skill: 'Git', weight: 2.0 },
      { skill: 'Teamwork', weight: 1.5 },
      { skill: 'Unit Testing', weight: 1.0 },
      { skill: 'UI/UX Design', weight: 1.0 },
      { skill: 'Prototyping', weight: 0.5 },
    ],
  },

  // 21. Embedded Systems Engineer
  {
    career: 'Embedded Systems Engineer',
    skills: [
      { skill: 'C++', weight: 3.0 },
      { skill: 'Linux', weight: 2.5 },
      { skill: 'Algorithms', weight: 2.5 },
      { skill: 'Data Structures', weight: 2.5 },
      { skill: 'Problem Solving', weight: 2.5 },
      { skill: 'Python', weight: 2.0 },
      { skill: 'Git', weight: 2.0 },
      { skill: 'Unit Testing', weight: 1.5 },
      { skill: 'Teamwork', weight: 1.0 },
      { skill: 'Rust', weight: 0.5 },
    ],
  },

  // 22. Business Intelligence Analyst
  {
    career: 'Business Intelligence Analyst',
    skills: [
      { skill: 'SQL', weight: 3.0 },
      { skill: 'MySQL', weight: 2.5 },
      { skill: 'PostgreSQL', weight: 2.5 },
      { skill: 'Communication', weight: 2.5 },
      { skill: 'Problem Solving', weight: 2.0 },
      { skill: 'Python', weight: 1.5 },
      { skill: 'Pandas', weight: 1.5 },
      { skill: 'Agile', weight: 1.0 },
      { skill: 'Time Management', weight: 1.0 },
      { skill: 'Git', weight: 0.5 },
    ],
  },

  // 23. Technical Writer
  {
    career: 'Technical Writer',
    skills: [
      { skill: 'Communication', weight: 3.0 },
      { skill: 'Git', weight: 2.5 },
      { skill: 'REST API', weight: 2.0 },
      { skill: 'Postman', weight: 2.0 },
      { skill: 'Time Management', weight: 2.0 },
      { skill: 'Teamwork', weight: 2.0 },
      { skill: 'HTML', weight: 1.5 },
      { skill: 'Problem Solving', weight: 1.5 },
      { skill: 'Agile', weight: 1.0 },
      { skill: 'JavaScript', weight: 0.5 },
    ],
  },

  // 24. Solutions Architect
  {
    career: 'Solutions Architect',
    skills: [
      { skill: 'System Design', weight: 3.0 },
      { skill: 'AWS', weight: 3.0 },
      { skill: 'Microservices', weight: 2.5 },
      { skill: 'Docker', weight: 2.5 },
      { skill: 'Kubernetes', weight: 2.5 },
      { skill: 'Leadership', weight: 2.5 },
      { skill: 'Communication', weight: 2.5 },
      { skill: 'Problem Solving', weight: 2.5 },
      { skill: 'Azure', weight: 2.0 },
      { skill: 'SQL', weight: 2.0 },
      { skill: 'Terraform', weight: 0.5 },
    ],
  },

  // 25. Systems Analyst
  {
    career: 'Systems Analyst',
    skills: [
      { skill: 'System Design', weight: 2.5 },
      { skill: 'Problem Solving', weight: 2.5 },
      { skill: 'SQL', weight: 2.5 },
      { skill: 'Communication', weight: 2.5 },
      { skill: 'Agile', weight: 2.0 },
      { skill: 'Scrum', weight: 2.0 },
      { skill: 'REST API', weight: 2.0 },
      { skill: 'Teamwork', weight: 2.0 },
      { skill: 'Git', weight: 1.5 },
      { skill: 'Postman', weight: 0.5 },
    ],
  },

  // 26. Robotics Engineer
  {
    career: 'Robotics Engineer',
    skills: [
      { skill: 'C++', weight: 3.0 },
      { skill: 'Python', weight: 3.0 },
      { skill: 'Computer Vision', weight: 2.5 },
      { skill: 'Linux', weight: 2.5 },
      { skill: 'Algorithms', weight: 2.5 },
      { skill: 'Problem Solving', weight: 2.5 },
      { skill: 'Machine Learning', weight: 2.0 },
      { skill: 'Git', weight: 1.5 },
      { skill: 'Unit Testing', weight: 1.0 },
      { skill: 'Rust', weight: 0.5 },
    ],
  },

  // 27. Computer Vision Engineer
  {
    career: 'Computer Vision Engineer',
    skills: [
      { skill: 'Python', weight: 3.0 },
      { skill: 'Computer Vision', weight: 3.0 },
      { skill: 'PyTorch', weight: 2.5 },
      { skill: 'Deep Learning', weight: 2.5 },
      { skill: 'TensorFlow', weight: 2.0 },
      { skill: 'C++', weight: 2.0 },
      { skill: 'NumPy', weight: 2.0 },
      { skill: 'Docker', weight: 1.5 },
      { skill: 'Scikit-learn', weight: 1.5 },
      { skill: 'Git', weight: 0.5 },
    ],
  },

  // 28. NLP Engineer
  {
    career: 'NLP Engineer',
    skills: [
      { skill: 'Python', weight: 3.0 },
      { skill: 'NLP', weight: 3.0 },
      { skill: 'PyTorch', weight: 2.5 },
      { skill: 'Deep Learning', weight: 2.5 },
      { skill: 'LLM APIs', weight: 2.5 },
      { skill: 'TensorFlow', weight: 2.0 },
      { skill: 'NumPy', weight: 2.0 },
      { skill: 'Pandas', weight: 2.0 },
      { skill: 'Docker', weight: 1.5 },
      { skill: 'Scikit-learn', weight: 1.5 },
      { skill: 'Git', weight: 0.5 },
    ],
  },
];

export async function seed(sequelize) {
  let createdCount = 0;
  let skippedCount = 0;
  let totalLinks = 0;

  // Cache careers and skills maps
  const careers = await Career.findAll();
  const careerMap = new Map(careers.map((c) => [c.title, c.id]));

  const skills = await Skill.findAll();
  const skillMap = new Map(skills.map((s) => [s.name, s.id]));

  for (const group of careerSkillsMatrix) {
    const careerId = careerMap.get(group.career);
    if (!careerId) {
      console.warn(`[05-career-skills] Career not found: "${group.career}"`);
      continue;
    }

    for (const item of group.skills) {
      totalLinks++;
      const skillId = skillMap.get(item.skill);
      if (!skillId) {
        console.warn(`[05-career-skills] Skill not found: "${item.skill}" for career "${group.career}"`);
        continue;
      }

      const isMissingHighlight = item.weight > 0.5;

      const [record, created] = await CareerSkill.findOrCreate({
        where: {
          career_id: careerId,
          skill_id: skillId,
        },
        defaults: {
          career_id: careerId,
          skill_id: skillId,
          weight: item.weight,
          is_missing_highlight: isMissingHighlight,
        },
      });

      if (created) {
        createdCount++;
      } else {
        skippedCount++;
      }
    }
  }

  console.log(`[05-career-skills] Career-Skills seeder complete: ${createdCount} created, ${skippedCount} skipped (total ${totalLinks})`);
  return { created: createdCount, skipped: skippedCount, total: totalLinks };
}

export default seed;
