import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import TestJwtService from '@test/utils/test-jwt-service';
import TestApp from '@test/utils/test-app';
import { TestHelpers } from '@test/utils/test-helpers';
import { TestUserService } from '@test/utils/test-user-service';

describe('Get Dentor', () => {
  const URL = '/dentor';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testJwtService: TestJwtService;
  let testUserService: TestUserService;
  let accessToken: string;
  const testHelpers = new TestHelpers();

  beforeAll(async () => {
    const testApp = new TestApp();
    testDatabaseService = new TestDatabaseService();
    testUserService = new TestUserService(testDatabaseService);
    testJwtService = new TestJwtService();
    accessToken = await testJwtService.generateAccessToken();

    app = await testApp.init();
  });

  it('should error if the user is unauthenticated', async () => {
    const dentor = await testUserService.createDentor();

    return request(app.getHttpServer())
      .get(`${URL}/${dentor.id}`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the dentor does not exist', async () => {
    return request(app.getHttpServer())
      .get(`${URL}/invaliddentorid`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not Found',
      });
  });

  it('should error if the dentor is not a dentor', async () => {
    const dentist = await testUserService.createDentist();

    return request(app.getHttpServer())
      .get(`${URL}/${dentist.id}`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not Found',
      });
  });

  it('should return a dentor', async () => {
    const dentor = await testUserService.createDentor();

    return request(app.getHttpServer())
      .get(`${URL}/${dentor.id}`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect((res) => {
        expect(res.body.data.id).toEqual(dentor.id);
        expect(res.body.data.name).toEqual(dentor.name);
        expect(res.body.data.gdcNumber).toEqual(dentor.gdcNumber);
      });
  });

  it('should return a response with the correct format', async () => {
    const dentor = await testUserService.createDentor();

    return request(app.getHttpServer())
      .get(`${URL}/${dentor.id}`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect((res) => {
        const responseKeys = testHelpers.convertResponseKeysToFlatArray(res.body.data);
        expect(responseKeys).toEqual([
          'id',
          'name',
          'gdcNumber',
          'rating',
          'bio',
        ]);
      });
  });
});
