import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import TestDatabaseService from '@test/utils/test-database-service';
import { TestUserService } from '@test/utils/test-user-service';
import { RoleName } from '@prisma/client';
import TestApp from '@test/utils/test-app';

describe('Register', () => {
  const URL = '/auth/register';
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
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.phone.number('+447#########'),
        password: faker.string.sample(4),
        passwordConfirmation: faker.string.sample(10),
      })
      .expect(422)
      .expect({
        statusCode: 422,
        message: 'Unprocessable Entity',
        error: {
          gdcNumber: ['gdcNumber must be a string'],
          password: ['password must be longer than or equal to 8 characters'],
          passwordConfirmation: ['"passwordConfirmation" does not match "password."'],
        },
      });
  });

  it('should error if the email is already in use', async () => {
    const existingUser = await testUserService.createDentist();
    const password = faker.internet.password({ length: 10 });

    return request(app.getHttpServer())
      .post(URL)
      .send({
        email: existingUser.email,
        name: faker.person.fullName(),
        phone: faker.phone.number('+447#########'),
        gdcNumber: faker.string.sample(8),
        password,
        passwordConfirmation: password,
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'User already exists',
        error: 'Bad Request',
      });
  });

  it('should error if the gdc number is already in use', async () => {
    const existingUser = await testUserService.createDentist();
    const password = faker.internet.password({ length: 10 });

    return request(app.getHttpServer())
      .post(URL)
      .send({
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.phone.number('+447#########'),
        gdcNumber: existingUser.gdcNumber,
        password,
        passwordConfirmation: password,
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'User already exists',
        error: 'Bad Request',
      });
  });

  it('should create a new user with a dentist role', async () => {
    const password = faker.string.sample(10);
    const userData = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number('+447#########'),
      gdcNumber: faker.string.sample(8),
      password,
      passwordConfirmation: password,
    };

    const response = await request(app.getHttpServer())
      .post(URL)
      .send(userData);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');

    const userDbRecord = await testDatabaseService.database.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    expect(userDbRecord.roleName).toEqual(RoleName.Dentist);
  });

  it('should return the correct format response', async () => {
    const password = faker.string.sample(10);
    const userData = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number('+447#########'),
      gdcNumber: faker.string.sample(8),
      password,
      passwordConfirmation: password,
    };

    const response = await request(app.getHttpServer())
      .post(URL)
      .send(userData);

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
      'onboardingState',
    ]);
  });

  afterAll(async () => {
    await testDatabaseService.disconnect();
    await app.close();
  });
});