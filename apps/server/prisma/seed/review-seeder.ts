import { PrismaClient, RoleName } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/en_GB';

export default class ReviewSeeder {
  constructor(private readonly database: PrismaClient) { }

  public async run() {
    console.log('Running review seeder');

    const now = new Date();
    const dentors = await this.database.user.findMany();

    await Promise.allSettled(dentors.map(dentor => {
      const reviewsToCreate = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

      console.log(`💬 Seeding ${reviewsToCreate} reviews for dentor:`, dentor.email);

      return Promise.allSettled([...Array(reviewsToCreate)].map(() => {
        return this.database.review.create({
          data: {
            title: faker.lorem.sentence(),
            rating: faker.number.int({ min: 1, max: 5 }),
            content: faker.lorem.paragraph(),
            dentor: {
              connect: {
                id: dentor.id,
              },
            },
            author: {
              create: {
                email: faker.internet.email(),
                roleName: RoleName.Dentist,
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