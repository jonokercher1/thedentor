import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '../utils/test-database-service';
import { TestUserService } from '@test/utils/test-user-service';
import TestApp from '@test/utils/test-app';
import { User } from '@prisma/client';
import { TestPasswordResetTokenService } from '@test/utils/test-password-reset-token-service';
import * as dayjs from 'dayjs';

describe('Get Password Reset By Token', () => {
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

  it('Should error if the token does not exist', async () => {
    return request(app.getHttpServer())
      .get(`${URL}/invalidtoken`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('Should error if the token has expired', async () => {
    const token = await testPasswordResetTokenService.create({ userId: user.id, expiresAt: dayjs().subtract(2, 'days').toDate() });

    return request(app.getHttpServer())
      .get(`${URL}/${token.token}`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('Should return basic token info with a valid token', async () => {
    const { token } = await testPasswordResetTokenService.create({ userId: user.id });

    const response = await request(app.getHttpServer())
      .get(`${URL}/${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');

    const responseBodyKeys = Object.keys(response.body.data);

    expect(responseBodyKeys).toEqual([
      'token',
      'user',
      'createdAt',
      'updatedAt',
    ]);

    const nestedUserKeys = Object.keys(response.body.data.user);

    expect(nestedUserKeys).toEqual(['email']);
  });
});