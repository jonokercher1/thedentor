import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/en_GB';
import TestDatabaseService from '../utils/test-database-service';
import { TestUserService } from '@test/utils/test-user-service';
import TestApp from '@test/utils/test-app';
import { User } from '@prisma/client';
import { TestPasswordResetTokenService } from '@test/utils/test-password-reset-token-service';

describe('Request Password Reset', () => {
  const URL = '/auth/password-reset/token';
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

  it('should expire all users existing password reset requests when a new one is requested', async () => {
    const [resetRequestOne, resetRequestTwo] = await Promise.all([
      testPasswordResetTokenService.create({ userId: user.id }),
      testPasswordResetTokenService.create({ userId: user.id }),
    ]);

    const response = await request(app.getHttpServer())
      .put(URL)
      .send({
        email: user.email,
      });

    expect(response.statusCode).toEqual(200);

    const resetTokens = await testPasswordResetTokenService.findAllForUserId(user.id);
    expect(resetTokens).toHaveLength(3);

    const resetTokenIds = resetTokens.map(({ id }) => id);
    expect(resetTokenIds.includes(resetRequestOne.id)).toBeTruthy();
    expect(resetTokenIds.includes(resetRequestTwo.id)).toBeTruthy();

    const dbTokenOne = resetTokens.find(({ id }) => id === resetRequestOne.id);
    expect(Number(dbTokenOne.expiresAt)).toBeLessThan(Number(new Date));

    const dbTokenTwp = resetTokens.find(({ id }) => id === resetRequestTwo.id);
    expect(Number(dbTokenTwp.expiresAt)).toBeLessThan(Number(new Date));

    // Ensure the third one hasnt expired
    const newDbToken = resetTokens.find(({ id }) => id !== resetRequestOne.id && id !== resetRequestTwo.id);
    expect(Number(newDbToken.expiresAt)).toBeGreaterThan(Number(new Date));
  });
});