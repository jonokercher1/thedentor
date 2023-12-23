import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/en_GB';
import TestDatabaseService from '../utils/test-database-service';
import { TestUserService } from '@test/utils/test-user-service';
import TestApp from '@test/utils/test-app';
import { TestOneTimePasswordService } from '@test/utils/test-one-time-password-service';
import * as dayjs from 'dayjs';

describe('Generate One Time Password', () => {
  const URL = '/auth/one-time-password';
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
        invalidkey: faker.string.sample(4),
      })
      .expect(422)
      .expect({
        statusCode: 422,
        message: 'Unprocessable Entity',
        error: {
          email: ['email must be an email'],
        },
      });
  });

  it('should generate a one time password for an existing user', async () => {
    const user = await testUserService.createDentist();

    const response = await request(app.getHttpServer())
      .post(URL)
      .send({
        email: user.email,
      });

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data.createdAt).toBeDefined();

    const activeOneTimePasswords = await testOneTimePasswordService.findAllUnexpiredForUserId(user.id);
    expect(activeOneTimePasswords).toHaveLength(1);
  });

  it('should generate a one time password for a new user', async () => {
    const email = faker.internet.email();
    const userBeforeOneTimePasswordLogin = await testUserService.findUserByEmail(email);

    expect(userBeforeOneTimePasswordLogin).toBeNull();

    const response = await request(app.getHttpServer())
      .post(URL)
      .send({
        email,
      });

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data.createdAt).toBeDefined();

    const userAfterOneTimePasswordLogin = await testUserService.findUserByEmail(email);

    expect(userAfterOneTimePasswordLogin.id).toBeDefined();
  });

  it('should return the correct format response', async () => {
    const user = await testUserService.createDentist();

    const response = await request(app.getHttpServer())
      .post(URL)
      .send({
        email: user.email,
      });

    const responseBodyKeys = Object.keys(response.body.data);

    expect(responseBodyKeys).toEqual([
      'createdAt',
    ]);
  });


  it('should error if the user has requested a one time password within the last minute', async () => {
    const user = await testUserService.createDentist();
    await testOneTimePasswordService.createForUser(user.id);

    const response = await request(app.getHttpServer())
      .post(URL)
      .send({
        email: user.email,
      });

    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual('Unauthorized');
  });

  it('should mark all existing one time passwords as expired when generating a new one', async () => {
    const user = await testUserService.createDentist();
    const oneTimePasswordOne = await testOneTimePasswordService.createForUser(user.id, { createdAt: dayjs().subtract(2, 'minutes').toDate() });
    const oneTimePasswordTwo = await testOneTimePasswordService.createForUser(user.id, { createdAt: dayjs().subtract(3, 'minutes').toDate() });

    const existingOneTimePasswordsForUser = await testOneTimePasswordService.findAllUnexpiredForUserId(user.id);
    expect(existingOneTimePasswordsForUser).toHaveLength(2);

    const response = await request(app.getHttpServer())
      .post(URL)
      .send({
        email: user.email,
      });

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data.createdAt).toBeDefined();

    const existingOneTimePasswordsForUserAfterLogin = await testOneTimePasswordService.findAllUnexpiredForUserId(user.id);
    expect(existingOneTimePasswordsForUserAfterLogin).toHaveLength(1);

    const activeOneTimePasswordIds = existingOneTimePasswordsForUserAfterLogin.map(({ id }) => id);

    expect(activeOneTimePasswordIds.includes(oneTimePasswordOne.id)).toBeFalsy();
    expect(activeOneTimePasswordIds.includes(oneTimePasswordTwo.id)).toBeFalsy();
  });
});