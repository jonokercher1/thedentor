import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import TestJwtService from '@test/utils/test-jwt-service';
import TestApp from '@test/utils/test-app';
import { TestHelpers } from '@test/utils/test-helpers';
import { TestUserService } from '@test/utils/test-user-service';

describe('Get Featured Dentors', () => {
  const URL = '/dentor/featured';
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

  beforeEach(async () => {
    await testHelpers.clearAllDataFromTable(testDatabaseService.database, 'User');
  });

  it('should error if the user is unauthenticated', async () => {
    return request(app.getHttpServer())
      .get(URL)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should not return users with a non dentor role', async () => {
    const nonDentorUser = await testUserService.createDentist();
    const dentorUser = await testUserService.createDentor({ rating: 5 });

    const response = await request(app.getHttpServer())
      .get(URL)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].id).toEqual(dentorUser.id);
    expect(response.body.page).toEqual(1);
    expect(response.body.total).toEqual(1);

    const responseIds = response.body.data.map(d => d.id);
    expect(responseIds.includes(nonDentorUser.id)).not.toBeTruthy();
  });

  it('should paginate the dentors', async () => {
    const firstDentorUser = await testUserService.createDentor({ rating: 5 });
    const secondDentorUser = await testUserService.createDentor({ rating: 5 });

    const response = await request(app.getHttpServer())
      .get(`${URL}?page=1&perPage=1`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].id).toEqual(firstDentorUser.id);
    expect(response.body.page).toEqual(1);
    expect(response.body.total).toEqual(2);

    const responseTwo = await request(app.getHttpServer())
      .get(`${URL}?page=2&perPage=1`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body.message).toEqual('success');
    expect(responseTwo.body.data).toHaveLength(1);

    expect(responseTwo.body.data[0].id).toEqual(secondDentorUser.id);
    expect(responseTwo.body.page).toEqual(2);
    expect(responseTwo.body.total).toEqual(2);
  });

  it('should return dentors in the correct format', async () => {
    await testUserService.createDentor({ rating: 5 });

    const response = await request(app.getHttpServer())
      .get(URL)
      .set('Cookie', [`authSession=${accessToken}`]);

    const responseObjectKeys = testHelpers.convertResponseKeysToFlatArray(response.body.data[0]);
    expect(responseObjectKeys).toEqual([
      'id',
      'name',
      'gdcNumber',
      'rating',
      'bio',
    ]);
  });

  it('should not return any dentors with a rating less than 4.5', async () => {
    await testUserService.createDentor({ rating: 4 });

    const response = await request(app.getHttpServer())
      .get(URL)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(0);

    expect(response.body.data[0]).toBeUndefined();
    expect(response.body.page).toEqual(1);
    expect(response.body.total).toEqual(0);
  });
});