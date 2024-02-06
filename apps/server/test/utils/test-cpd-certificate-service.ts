import { CpdCertificate, Prisma } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { TestUserService } from './test-user-service';
import { TestCourseService } from './test-course-service';

export class TestCpdCertificateService {
  private readonly entity: Prisma.CpdCertificateDelegate;

  private readonly testUserService: TestUserService;

  private readonly testCourseService: TestCourseService;

  constructor(databaseService: TestDatabaseService) {
    this.entity = databaseService.database.cpdCertificate;
    this.testUserService = new TestUserService(databaseService);
    this.testCourseService = new TestCourseService(databaseService);
  }

  public async createUserCertificateForCourse(userId?: string, courseId?: string): Promise<CpdCertificate> {
    let user = userId;
    let course = courseId;

    if (!userId) {
      const defaultUser = await this.testUserService.createDentist();
      user = defaultUser.id;
    }

    if (!courseId) {
      const defaultCourse = await this.testCourseService.createCourse();
      course = defaultCourse.id;
    }

    return this.entity.create({
      data: {
        course: {
          connect: {
            id: course,
          },
        },
        user: {
          connect: {
            id: user,
          },
        },
      },
    });
  }

  public async getCertificateById(certificateId: string): Promise<CpdCertificate> {
    return this.entity.findUnique({
      where: {
        id: certificateId,
      },
    });
  }

  public async deleteAll(): Promise<void> {
    await this.entity.deleteMany();
  }
}