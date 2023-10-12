import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/en_GB';
import TestDatabaseService from '../utils/test-database-service';
import { TestUserService } from '@test/utils/test-user-service';
import TestApp from '@test/utils/test-app';

describe('Login', () => {
  const URL = '/auth/login';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testUserService: TestUserService;

  beforeAll(async () => {
    const testApp = new TestApp();

    testDatabaseService = new TestDatabaseService();
    testUserService = new TestUserService(testDatabaseService);

    app = await testApp.init();
  });

  it('should error if the request body is invalid', async () => {
    return request(app.getHttpServer())
      .post(URL)
      .send({
        password: faker.string.sample(4),
      })
      .expect(422)
      .expect({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: {
          email: ['email must be an email'],
          password: ['password must be longer than or equal to 8 characters'],
        },
      });
  });

  it('should error if the user does not exist', async () => {
    const password = faker.internet.password({ length: 10 });

    return request(app.getHttpServer())
      .post(URL)
      .send({
        email: faker.internet.email(),
        password,
      })
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should return the correct format response', async () => {
    const password = faker.string.sample(10);
    const userData = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number('+447#########'),
      gdcNumber: faker.string.sample(8),
      password,
    };

    await testUserService.createDentist(userData);

    const response = await request(app.getHttpServer())
      .post(URL)
      .send({
        email: userData.email,
        password,
      });

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');

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

  afterAll(async () => {
    await testDatabaseService.disconnect();
    await app.close();
  });
});