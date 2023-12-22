import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '../utils/test-database-service';
import { TestUserService } from '@test/utils/test-user-service';
import TestApp from '@test/utils/test-app';
import TestJwtService from '@test/utils/test-jwt-service';

describe('Get Self', () => {
  const URL = '/auth/me';
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

  it('should error if there is no valid request cookie', async () => {
    const response = await request(app.getHttpServer())
      .get(URL)
      .expect(401);

    expect(response.body.message).toEqual('Unauthorized');
  });

  it('should error if the request cookie JWT has expired', async () => {
    const expiredAccessToken = await testJwtService.generateAccessToken(undefined, '-1h');
    const response = await request(app.getHttpServer())
      .get(URL)
      .set('Cookie', [`authSession=${expiredAccessToken}`])
      .expect(401);

    expect(response.body.message).toEqual('Unauthorized');
  });

  it('should error if the request cookie JWT has been tampered with', async () => {
    const validAccessToken = await testJwtService.generateAccessToken(undefined, '1d');
    const response = await request(app.getHttpServer())
      .get(URL)
      .set('Cookie', [`authSession=${validAccessToken}tampered`])
      .expect(401);

    expect(response.body.message).toEqual('Unauthorized');
  });

  it('should return the current user', async () => {
    const user = await testUserService.createDentist();
    const validAccessToken = await testJwtService.generateAccessToken({ ...user }, '1d');

    const response = await request(app.getHttpServer())
      .get(URL)
      .set('Cookie', [`authSession=${validAccessToken}`])
      .expect(200);

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
});