import { Course } from '@prisma/client';
import TestDatabaseService from './test-database-service';

export class TestUserCourseService {
  constructor(private readonly databaseService: TestDatabaseService) { }

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
}
