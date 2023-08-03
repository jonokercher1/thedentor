import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import TestDatabaseService from '../utils/TestDatabaseService';
import { AuthModule } from '../../src/auth/auth.module';
import { UserModule } from '../../src/user/user.module';
import { DatabaseModule } from '../../src/database/database.module';
import { TestUserService } from '../utils/TestUserService';
import { IPaymentProvider } from '../../src/payment/types/PaymentProvider';
import { TestPaymentProvider } from '../utils/TestPaymentProvider';
import { BodyValidationPipe } from '../../src/common/pipes/BodyValidationPipe';
import { Reflector } from '@nestjs/core';

describe('Login', () => {
  const URL = '/auth/login';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testUserService: TestUserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule, DatabaseModule, UserModule],
    })
      .overrideProvider(IPaymentProvider)
      .useClass(TestPaymentProvider)
      .compile();

    app = moduleRef.createNestApplication();
    testDatabaseService = new TestDatabaseService();
    testUserService = new TestUserService(testDatabaseService);

    app.useGlobalPipes(new BodyValidationPipe());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), { excludeExtraneousValues: true }));

    await app.init();
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
    expect(response.body.success).toBeTruthy();

    const responseBodyKeys = Object.keys(response.body.data);

    expect(responseBodyKeys).toEqual([
      'id',
      'email',
      'name',
      'phone',
      'gdcNumber',
      'role',
      'accessToken',
    ]);
  });

  afterAll(async () => {
    await testDatabaseService.disconnect();
    await app.close();
  });
});