import sequelize from '../config/database.js';
import '../models/index.js'; // Ensure all models & associations are registered
import seedSkills from './01-skills.js';
import seedInterests from './02-interests.js';
import seedSubjects from './03-subjects.js';
import seedCareers from './04-careers.js';
import seedCareerSkills from './05-career-skills.js';
import seedCareerInterests from './06-career-interests.js';
import seedCareerSubjects from './07-career-subjects.js';

export async function runAllSeeders() {
  console.log('=====================================================');
  console.log('Starting AI Career Recommendation Stack Seeder Suite');
  console.log('=====================================================');

  const startTime = Date.now();
  const summary = {};

  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('[run-all] Database connection authenticated successfully.');

    // Ensure database tables exist before seeding
    await sequelize.sync();
    console.log('[run-all] Database schema synchronized.');

    // 1. Skills
    console.log('\n--- Step 1/7: Seeding Skills ---');
    summary.skills = await seedSkills(sequelize);

    // 2. Interests
    console.log('\n--- Step 2/7: Seeding Interests ---');
    summary.interests = await seedInterests(sequelize);

    // 3. Academic Subjects
    console.log('\n--- Step 3/7: Seeding Academic Subjects ---');
    summary.subjects = await seedSubjects(sequelize);

    // 4. Careers
    console.log('\n--- Step 4/7: Seeding Careers ---');
    summary.careers = await seedCareers(sequelize);

    // 5. Career Skills Matrix
    console.log('\n--- Step 5/7: Seeding Career-Skills Associations ---');
    summary.careerSkills = await seedCareerSkills(sequelize);

    // 6. Career Interests Matrix
    console.log('\n--- Step 6/7: Seeding Career-Interests Associations ---');
    summary.careerInterests = await seedCareerInterests(sequelize);

    // 7. Career Subjects Matrix
    console.log('\n--- Step 7/7: Seeding Career-Subjects Associations ---');
    summary.careerSubjects = await seedCareerSubjects(sequelize);

    const elapsedMs = Date.now() - startTime;

    console.log('\n=====================================================');
    console.log('Seeder Suite Execution Completed Successfully!');
    console.log(`Elapsed Time: ${elapsedMs}ms`);
    console.log('Summary Breakdown:');
    console.log(`- Skills:           ${summary.skills.created} created, ${summary.skills.skipped} skipped (total ${summary.skills.total})`);
    console.log(`- Interests:        ${summary.interests.created} created, ${summary.interests.skipped} skipped (total ${summary.interests.total})`);
    console.log(`- Academic Subjects:${summary.subjects.created} created, ${summary.subjects.skipped} skipped (total ${summary.subjects.total})`);
    console.log(`- Careers:          ${summary.careers.created} created, ${summary.careers.skipped} skipped (total ${summary.careers.total})`);
    console.log(`- Career-Skills:    ${summary.careerSkills.created} created, ${summary.careerSkills.skipped} skipped (total ${summary.careerSkills.total})`);
    console.log(`- Career-Interests: ${summary.careerInterests.created} created, ${summary.careerInterests.skipped} skipped (total ${summary.careerInterests.total})`);
    console.log(`- Career-Subjects:  ${summary.careerSubjects.created} created, ${summary.careerSubjects.skipped} skipped (total ${summary.careerSubjects.total})`);
    console.log('=====================================================');

    return summary;
  } catch (error) {
    console.error('\n[run-all] ERROR encountered during seeder execution:', error);
    throw error;
  }
}

// When invoked directly from the CLI (e.g. `npm run db:seed` or `node src/seeders/run-all.js`)
const isDirectRun = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('run-all.js');
if (isDirectRun) {
  runAllSeeders()
    .then(async () => {
      await sequelize.close();
      process.exit(0);
    })
    .catch(async (err) => {
      try {
        await sequelize.close();
      } catch (_) {}
      process.exit(1);
    });
}

export default runAllSeeders;
