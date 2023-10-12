import { PasswordResetToken, Prisma } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { TestUserService } from './test-user-service';
import { faker } from '@faker-js/faker/locale/en_GB';

export class TestPasswordResetTokenService {
  private readonly entity: Prisma.PasswordResetTokenDelegate;

  private readonly testUserService: TestUserService;

  constructor(databaseService: TestDatabaseService) {
    this.entity = databaseService.database.passwordResetToken;
    this.testUserService = new TestUserService(databaseService);
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

  public async findAllForUserId(userId: string): Promise<PasswordResetToken[]> {
    return this.entity.findMany({ where: { userId } });
  }

  public async create(dataOverrides?: Partial<PasswordResetToken>): Promise<PasswordResetToken> {
    let userId = dataOverrides?.userId;

    if (!userId) {
      const user = await this.testUserService.createDentist();
      userId = user.id;
    }

    return this.entity.create({
      data: {
        userId,
        token: faker.string.uuid(),
        ...dataOverrides,
      },
    });
  }

  public async deleteAll(): Promise<void> {
    await this.entity.deleteMany();
  }
}