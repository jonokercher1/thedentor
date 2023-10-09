import { PasswordResetToken, Prisma } from '@prisma/client';
import TestDatabaseService from './test-database-service';

export class TestPasswordResetTokenService {
  private readonly entity: Prisma.PasswordResetTokenDelegate;

  constructor(databaseService: TestDatabaseService) {
    this.entity = databaseService.database.passwordResetToken;
  }

  public async findByToken(token: string): Promise<PasswordResetToken> {
    return this.entity.findUnique({ where: { token } });
  }

  public async findForUserEmail(email: string): Promise<PasswordResetToken> {
    return this.entity.findFirst({
      where: {
        user: {
          email,
        },
      },
    });
  }

  public async deleteAll(): Promise<void> {
    await this.entity.deleteMany();
  }
}