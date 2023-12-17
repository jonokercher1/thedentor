import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/en_GB';
import TestDatabaseService from '../utils/test-database-service';
import { TestUserService } from '@test/utils/test-user-service';
import TestApp from '@test/utils/test-app';
import { TestOneTimePasswordService } from '@test/utils/test-one-time-password-service';
import * as dayjs from 'dayjs';

describe('One Time Password Login', () => {
  const URL = '/auth/one-time-password/login';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testUserService: TestUserService;
  let testOneTimePasswordService: TestOneTimePasswordService;

  beforeAll(async () => {
    const testApp = new TestApp();

    testDatabaseService = new TestDatabaseService();
    testUserService = new TestUserService(testDatabaseService);
    testOneTimePasswordService = new TestOneTimePasswordService(testDatabaseService);

    app = await testApp.init();
  });

  it('should error if the request body is invalid', async () => {
    return request(app.getHttpServer())
      .post(URL)
      .send({
        email: faker.internet.email(),
      })
      .expect(422)
      .expect({
        statusCode: 422,
        message: 'Unprocessable Entity',
        error: {
          oneTimePassword: ['oneTimePassword should not be empty'],
        },
      });
  });

  it('should error if the email and one time password doesnt match', async () => {
    const user = await testUserService.createDentist();

    return request(app.getHttpServer())
      .post(URL)
      .send({
        email: user.email,
        oneTimePassword: faker.string.sample(),
      })
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the token has expired', async () => {
    const user = await testUserService.createDentist();
    const oneTimePassword = await testOneTimePasswordService.createForUser(user.id, { expiresAt: dayjs().subtract(1, 'hour').toDate() });

    return request(app.getHttpServer())
      .post(URL)
      .send({
        email: user.email,
        oneTimePassword: oneTimePassword.token,
      })
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should return the current user when a valid combination is entered', async () => {
    const user = await testUserService.createDentist();
    const oneTimePassword = await testOneTimePasswordService.createForUser(user.id);

    const response = await request(app.getHttpServer())
      .post(URL)
      .send({
        email: user.email,
        oneTimePassword: oneTimePassword.token,
      });

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data.id).toEqual(user.id);
  });

  it('should return the correct format response', async () => {
    const user = await testUserService.createDentist();
    const oneTimePassword = await testOneTimePasswordService.createForUser(user.id);

    const response = await request(app.getHttpServer())
      .post(URL)
      .send({
        email: user.email,
        oneTimePassword: oneTimePassword.token,
      });

    const responseBodyKeys = Object.keys(response.body.data);

    expect(responseBodyKeys).toEqual([
      'id',
      'email',
      'name',
      'phone',
      'gdcNumber',
      'role',
    ]);
  });

  // TOOD: we might need to look at deleting all old OTPs but for now, expiring them is ok so we can audit login attempts
  it('should expire all the users existing one time passwords on successful login', async () => {
    const user = await testUserService.createDentist();
    await testOneTimePasswordService.createForUser(user.id);
    const oneTimePassword = await testOneTimePasswordService.createForUser(user.id);

    const existingOneTimePasswords = await testOneTimePasswordService.findAllUnexpiredForUserId(user.id);
    expect(existingOneTimePasswords).toHaveLength(2);

    await request(app.getHttpServer())
      .post(URL)
      .send({
        email: user.email,
        oneTimePassword: oneTimePassword.token,
      });

    const existingOneTimePasswordsAfterLogin = await testOneTimePasswordService.findAllUnexpiredForUserId(user.id);
    expect(existingOneTimePasswordsAfterLogin).toHaveLength(0);
  });
});