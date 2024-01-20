import { PrismaClient } from '@prisma/client';
import CategorySeeder from './seed/category-seeder';
import RoleSeeder from './seed/role-seeder';
import UserSeeder from './seed/user-seeder';
import CourseSeeder from './seed/course-seeder';
import DentorSeeder from './seed/dentor-seeder';
import ReviewSeeder from './seed/review-seeder';
import CourseFeedbackQuestionsSeeder from './seed/course-feedback-questions-seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  // const seeders = [
  //   RoleSeeder,
  //   CategorySeeder,
  //   UserSeeder,
  // ];

  // TODO: get this implementation to bloody work
  // await Promise.allSettled(
  //   seeders.map(Seeder => {
  //     const instance = new Seeder(prisma);
  //     return instance.run();
  //   }),
  // );

  await new RoleSeeder(prisma).run();
  await new CategorySeeder(prisma).run();
  await new UserSeeder(prisma).run();
  await new CourseSeeder(prisma).run();
  await new DentorSeeder(prisma).run();
  await new ReviewSeeder(prisma).run();
  await new CourseFeedbackQuestionsSeeder(prisma).run();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Database seeded.');
  });