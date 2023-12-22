import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/en_GB';
import TestDatabaseService from '../utils/test-database-service';
import { TestUserService } from '@test/utils/test-user-service';
import TestApp from '@test/utils/test-app';
import TestJwtService from '@test/utils/test-jwt-service';

describe('Update self', () => {
  const URL = '/user/self';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testUserService: TestUserService;
  let testJwtService: TestJwtService;

  beforeAll(async () => {
    const testApp = new TestApp();

    testDatabaseService = new TestDatabaseService();
    testUserService = new TestUserService(testDatabaseService);
    testJwtService = new TestJwtService();

    app = await testApp.init();
  });

  it('should error if the user is unauthenticated', async () => {
    return request(app.getHttpServer())
      .patch(URL)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the request body is invalid', async () => {
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .patch(URL)
      .set('Cookie', [`authSession=${accessToken}`])
      .send({
        email: 'invalidemailaddress',
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

  it('should allow for partial updates of the current user', async () => {
    const user = await testUserService.createDentist();
    const accessToken = await testJwtService.generateAccessToken(user);

    const newUserData = {
      email: faker.internet.email(),
      gdcNumber: faker.string.sample(8),
    };

    // TODO: There is potential here that faker generates the same data twice
    // feels very unlikely but it IS possible
    expect(user.email).not.toEqual(newUserData.email);
    expect(user.gdcNumber).not.toEqual(newUserData.gdcNumber);

    const response = await request(app.getHttpServer())
      .patch(URL)
      .set('Cookie', [`authSession=${accessToken}`])
      .send(newUserData);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data.id).toEqual(user.id);
    expect(response.body.data.email).toEqual(newUserData.email);
    expect(response.body.data.gdcNumber).toEqual(newUserData.gdcNumber);

    const dbUserAfterMutation = await testUserService.findUserById(user.id);
    expect(dbUserAfterMutation.email).toEqual(newUserData.email);
    expect(dbUserAfterMutation.gdcNumber).toEqual(newUserData.gdcNumber);
  });

  it('should return the correct format response', async () => {
    const user = await testUserService.createDentist();
    const accessToken = await testJwtService.generateAccessToken(user);

    const response = await request(app.getHttpServer())
      .patch(URL)
      .set('Cookie', [`authSession=${accessToken}`])
      .send({
        email: faker.internet.email(),
      });

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
});