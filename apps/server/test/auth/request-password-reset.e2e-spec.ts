import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/en_GB';
import TestDatabaseService from '../utils/test-database-service';
import { TestUserService } from '@test/utils/test-user-service';
import TestApp from '@test/utils/test-app';
import { User } from '@prisma/client';
import { TestPasswordResetTokenService } from '@test/utils/test-password-reset-token-service';

describe('Request Password Reset', () => {
  const URL = '/auth/password-reset';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testUserService: TestUserService;
  let testPasswordResetTokenService: TestPasswordResetTokenService;

  let user: User;

  beforeAll(async () => {
    const testApp = new TestApp();

    testDatabaseService = new TestDatabaseService();
    testUserService = new TestUserService(testDatabaseService);
    testPasswordResetTokenService = new TestPasswordResetTokenService(testDatabaseService);

    user = await testUserService.createDentist();
    app = await testApp.init();
  });

  beforeEach(async () => {
    await testPasswordResetTokenService.deleteAll();
  });

  it('should error if the request body is invalid', async () => {
    return request(app.getHttpServer())
      .put(URL)
      .send({})
      .expect(422)
      .expect({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: {
          email: ['email must be an email'],
        },
      });
  });

  it('should store a password reset token in the database', async () => {
    const response = await request(app.getHttpServer())
      .put(URL)
      .send({
        email: user.email,
      });

    expect(response.statusCode).toEqual(200);

    const resetToken = await testPasswordResetTokenService.findForUserEmail(user.email);
    expect(resetToken.userId).toEqual(user.id);
    expect(resetToken.token).toBeDefined();
  });

  it('should succeed but not create a token if the email dones\'t exist', async () => {
    const response = await request(app.getHttpServer())
      .put(URL)
      .send({
        email: faker.internet.email(),
      });

    expect(response.statusCode).toEqual(200);

    const resetToken = await testPasswordResetTokenService.findForUserEmail(user.email);
    expect(resetToken?.userId).not.toBeDefined();
    expect(resetToken?.token).not.toBeDefined();
  });
});