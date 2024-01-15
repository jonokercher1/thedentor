import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestApp from '@test/utils/test-app';
import TestDatabaseService from '@test/utils/test-database-service';
import { TestUserService } from '@test/utils/test-user-service';
import { TestApiKeyService } from '@test/utils/test-api-key-service';
import { faker } from '@faker-js/faker/locale/en_GB';
import { TestHelpers } from '@test/utils/test-helpers';

describe('Create User', () => {
  const URL = '/user';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testUserService: TestUserService;
  let testApiKeyService: TestApiKeyService;
  const testHelpers = new TestHelpers();

  beforeAll(async () => {
    const testApp = new TestApp();

    testDatabaseService = new TestDatabaseService();
    testUserService = new TestUserService(testDatabaseService);
    testApiKeyService = new TestApiKeyService(testDatabaseService);

    app = await testApp.init();
  });

  it('should error if there is no api key used', async () => {
    return request(app.getHttpServer())
      .put(URL)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the api key used is invalid', async () => {
    return request(app.getHttpServer())
      .put(URL)
      .set({
        'x-api-key': 'invalidapikey',
      })
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the api key used has expired', async () => {
    const dentor = await testUserService.createDentor();
    const expiredApiKey = await testApiKeyService.createExpiredApiKeyForUser(dentor.id);

    return request(app.getHttpServer())
      .put(URL)
      .set({
        'x-api-key': expiredApiKey.key,
      })
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the request body is invalid', async () => {
    const dentor = await testUserService.createDentor();
    const apiKey = await testApiKeyService.createValidApiKeyForUser(dentor.id);

    return request(app.getHttpServer())
      .put(URL)
      .set({
        'x-api-key': apiKey.key,
      })
      .send({
        email: 'invalidemail',
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

  it('should return the created user when just an email is sent', async () => {
    const dentor = await testUserService.createDentor();
    const apiKey = await testApiKeyService.createValidApiKeyForUser(dentor.id);
    const email = faker.internet.email();

    return request(app.getHttpServer())
      .put(URL)
      .set({
        'x-api-key': apiKey.key,
      })
      .send({ email })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.email).toEqual(email);
      });
  });

  it('should allow creation with additional user details', async () => {
    const dentor = await testUserService.createDentor();
    const apiKey = await testApiKeyService.createValidApiKeyForUser(dentor.id);
    const email = faker.internet.email();
    const name = faker.person.fullName();
    const phone = faker.phone.number();

    return request(app.getHttpServer())
      .put(URL)
      .set({
        'x-api-key': apiKey.key,
      })
      .send({ email, name, phone })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.email).toEqual(email);
        expect(res.body.data.phone).toEqual(phone);
        expect(res.body.data.name).toEqual(name);
      });
  });

  it('should return a successful response if the user already exists', async () => {
    const dentor = await testUserService.createDentor();
    const apiKey = await testApiKeyService.createValidApiKeyForUser(dentor.id);
    const email = faker.internet.email();
    const existingUser = await testUserService.createDentist({ email });

    return request(app.getHttpServer())
      .put(URL)
      .set({
        'x-api-key': apiKey.key,
      })
      .send({ email })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.email).toEqual(existingUser.email);
      });
  });

  it('should return the correct format response', async () => {
    const dentor = await testUserService.createDentor();
    const apiKey = await testApiKeyService.createValidApiKeyForUser(dentor.id);
    const email = faker.internet.email();

    return request(app.getHttpServer())
      .put(URL)
      .set({
        'x-api-key': apiKey.key,
      })
      .send({ email })
      .expect(200)
      .expect((res) => {
        const keys = testHelpers.convertResponseKeysToFlatArray(res.body.data);
        expect(keys).toEqual([
          'email',
          'name',
          'phone',
        ]);
      });
  });
});
