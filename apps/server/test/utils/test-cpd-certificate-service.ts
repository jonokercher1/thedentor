import { CpdCertificate, Prisma } from '@prisma/client';
import TestDatabaseService from './test-database-service';

export class TestCpdCertificateService {
  private readonly entity: Prisma.CpdCertificateDelegate;

  constructor(databaseService: TestDatabaseService) {
    this.entity = databaseService.database.cpdCertificate;
  }

  public async createUserCertificateForCourse(userId: string, courseId: string): Promise<void> {
    await this.entity.create({
      data: {
        course: {
          connect: {
            id: courseId,
          },
        },
        user: {
          connect: {
            id: userId,
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