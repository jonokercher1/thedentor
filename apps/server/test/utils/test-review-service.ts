import { Prisma, Review } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { TestUserService } from './test-user-service';
import { faker } from '@faker-js/faker/locale/en_GB';

export class TestReviewService {
  private readonly entity: Prisma.ReviewDelegate;

  private readonly testUserService: TestUserService;

  constructor(private readonly databaseService: TestDatabaseService) {
    this.entity = databaseService.database.review;
    this.testUserService = new TestUserService(databaseService);
  }

  public async createReview(dataOverrides?: Partial<Review>): Promise<Review> {
    let authorId = dataOverrides?.authorId;
    let dentorId = dataOverrides?.dentorId;

    if (!authorId) {
      const author = await this.testUserService.createDentist();
      authorId = author.id;
    }

    if (!dentorId) {
      const dentor = await this.testUserService.createDentor();
      dentorId = dentor.id;
    }

    return this.entity.create({
      data: {
        title: dataOverrides?.title ?? faker.string.sample(20),
        content: dataOverrides?.content ?? faker.word.words(20),
        rating: dataOverrides?.rating ?? faker.number.int({ min: 1, max: 5 }),
        author: {
          connect: {
            id: authorId,
          },
        },
        dentor: {
          connect: {
            id: dentorId,
          },
        },
      },
    });
  }

  public async deleteAll(): Promise<void> {
    await this.entity.deleteMany();
  }
}