import { Course, Prisma } from '@prisma/client';
import TestDatabaseService from './test-database-service';

export class TestUserCourseService {
  private readonly userEntity: Prisma.UserDelegate;

  constructor(private readonly databaseService: TestDatabaseService) {
    this.userEntity = databaseService.database.user;
  }

  public async getCoursesPurchasedByUser(userId: string): Promise<Course[]> {
    return this.databaseService.database.course.findMany({
      where: {
        ownedByUsers: {
          some: {
            id: userId,
          },
        },
      },
    });
  }

  public async markUserAsAttendedCourse(userId: string, courseId: string) {
    return this.userEntity.update({
      data: {
        purchasedCourses: {
          connect: {
            id: courseId,
          },
        },
      },
      where: {
        id: userId,
      },
    });
  }
}
