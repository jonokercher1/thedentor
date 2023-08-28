import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import TestDatabaseService from '../utils/TestDatabaseService';
import { AuthModule } from '../../src/auth/auth.module';
import { UserModule } from '../../src/user/user.module';
import { DatabaseModule } from '../../src/database/database.module';
import { TestUserService } from '../utils/TestUserService';
import { IPaymentProvider } from '../../src/payment/types/payment-provider';
import { TestPaymentProvider } from '../utils/TestPaymentProvider';
import { BodyValidationPipe } from '../../src/common/pipes/body-validation-pipe';
import { RoleName, SubscriptionTierName } from '@prisma/client';
import { Reflector } from '@nestjs/core';

describe('Register', () => {
  const URL = '/auth/register';
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
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.phone.number('+447#########'),
        password: faker.string.sample(4),
        passwordConfirmation: faker.string.sample(10),
      })
      .expect(422)
      .expect({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: {
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

  it('should create a new user with a payment provider customer ID', async () => {
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
    expect(response.body.success).toBeTruthy();

    const userDbRecord = await testDatabaseService.database.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    expect(userDbRecord.paymentProviderCustomerId).toEqual('payment-provider-customer-id');
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
    expect(response.body.success).toBeTruthy();

    const userDbRecord = await testDatabaseService.database.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    expect(userDbRecord.roleName).toEqual(RoleName.Dentist);
  });

  it('should create a new user with a premium subscription', async () => {
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
    expect(response.body.success).toBeTruthy();

    const userDbRecord = await testDatabaseService.database.user.findFirst({
      where: {
        email: userData.email,
      },
      select: {
        subscription: {
          select: {
            subscriptionTier: true,
          },
        },
      },
    });

    expect(userDbRecord.subscription.subscriptionTier.name).toEqual(SubscriptionTierName.DentistPremium);
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