import { Course, CourseType, Prisma } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { faker } from '@faker-js/faker/locale/en_GB';
import { TestUserService } from './test-user-service';

export class TestCourseService {
  private readonly entity: Prisma.CourseDelegate;

  private readonly testUserService: TestUserService;

  constructor(databaseService: TestDatabaseService) {
    this.entity = databaseService.database.course;
    this, this.testUserService = new TestUserService(databaseService);
  }

  public async createInPersonCourse(categories: string[] = [], dataOverrides?: Partial<Course>): Promise<Course> {
    return this.createCourse(CourseType.InPerson, categories, dataOverrides);
  }

  public async createVideoCourse(categories: string[] = [], dataOverrides?: Partial<Course>): Promise<Course> {
    return this.createCourse(CourseType.Video, categories, dataOverrides);
  }

  public async createCourse(type: CourseType = CourseType.InPerson, categories: string[] = [], dataOverrides?: Partial<Course>): Promise<Course> {
    let dentorId = dataOverrides?.dentorId;

    if (!dentorId) {
      const dentor = await this.testUserService.createDentor();
      dentorId = dentor.id;
    }

    return this.entity.create({
      data: {
        type,
        price: dataOverrides?.price ?? faker.number.float(),
        cpdValue: dataOverrides?.cpdValue ?? faker.number.int(),
        description: dataOverrides?.description ?? faker.string.sample(),
        dentor: {
          connect: {
            id: dentorId,
          },
        },
        category: {
          connect: categories.map(c => ({ slug: c })),
        },
      },
    });
  }

  public async deleteAll(): Promise<void> {
    await this.entity.deleteMany();
  }
}