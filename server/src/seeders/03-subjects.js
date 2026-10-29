import AcademicSubject from '../models/AcademicSubject.js';

export const subjectsData = [
  { name: 'Data Structures', category: 'core_cs' },
  { name: 'Operating Systems', category: 'core_cs' },
  { name: 'DBMS', category: 'core_cs' },
  { name: 'Computer Networks', category: 'core_cs' },
  { name: 'Software Engineering', category: 'core_cs' },
  { name: 'Artificial Intelligence', category: 'core_cs' },
  { name: 'Mathematics', category: 'math' },
  { name: 'Statistics', category: 'math' },
  { name: 'Physics', category: 'science' },
  { name: 'Electronics', category: 'engineering' },
  { name: 'Distributed Systems', category: 'elective' },
  { name: 'Cloud Computing', category: 'elective' },
];

export async function seed(sequelize) {
  let createdCount = 0;
  let skippedCount = 0;

  for (const item of subjectsData) {
    const [record, created] = await AcademicSubject.findOrCreate({
      where: { name: item.name },
      defaults: item,
    });

    if (created) {
      createdCount++;
    } else {
      skippedCount++;
    }
  }

  console.log(`[03-subjects] Academic subjects seeder complete: ${createdCount} created, ${skippedCount} skipped (total ${subjectsData.length})`);
  return { created: createdCount, skipped: skippedCount, total: subjectsData.length };
}

export default seed;
