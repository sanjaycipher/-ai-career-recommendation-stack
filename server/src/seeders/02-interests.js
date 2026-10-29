import Interest from '../models/Interest.js';

export const interestsData = [
  { name: 'web' },
  { name: 'data' },
  { name: 'design' },
  { name: 'systems' },
  { name: 'ai' },
  { name: 'mobile' },
  { name: 'cloud' },
  { name: 'security' },
  { name: 'product' },
  { name: 'research' },
];

export async function seed(sequelize) {
  let createdCount = 0;
  let skippedCount = 0;

  for (const item of interestsData) {
    const [record, created] = await Interest.findOrCreate({
      where: { name: item.name },
      defaults: item,
    });

    if (created) {
      createdCount++;
    } else {
      skippedCount++;
    }
  }

  console.log(`[02-interests] Interests seeder complete: ${createdCount} created, ${skippedCount} skipped (total ${interestsData.length})`);
  return { created: createdCount, skipped: skippedCount, total: interestsData.length };
}

export default seed;
