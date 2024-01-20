import { CourseFeedbackQuestionType, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/en_GB';

export default class CourseFeedbackQuestionsSeeder {
  constructor(private readonly database: PrismaClient) { }

  public async run() {
    console.log('Running course feedback questions seeder');

    const now = new Date();
    const courses = await this.database.course.findMany();

    await Promise.allSettled(courses.map(course => {
      const questionsToCreate = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

      console.log(`💬 Seeding ${questionsToCreate} questions for course:`, course.id);

      return Promise.allSettled([...Array(questionsToCreate)].map((_, index) => {
        const randomIndex = Math.floor(Math.random() * Object.keys(CourseFeedbackQuestionType).length);

        return this.database.courseFeedbackQuestion.create({
          data: {
            question: faker.lorem.sentence(),
            type: CourseFeedbackQuestionType[Object.keys(CourseFeedbackQuestionType)[randomIndex]],
            order: index,
            course: {
              connect: {
                id: course.id,
              },
            },
            createdAt: now,
            updatedAt: now,
          },
        });
      }));
    }));
  }
}