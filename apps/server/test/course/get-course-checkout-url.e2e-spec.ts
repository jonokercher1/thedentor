import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import TestJwtService from '@test/utils/test-jwt-service';
import { TestCourseService } from '@test/utils/test-course-service';
import TestApp from '@test/utils/test-app';
import { TestHelpers } from '@test/utils/test-helpers';

describe('Get Course Checkout Url', () => {
  const URL = '/course/checkout';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testJwtService: TestJwtService;
  let testCourseService: TestCourseService;
  const testHelpers = new TestHelpers();

  beforeAll(async () => {
    const testApp = new TestApp();
    testDatabaseService = new TestDatabaseService();
    testJwtService = new TestJwtService();
    testCourseService = new TestCourseService(testDatabaseService);

    app = await testApp.init();
  });

  beforeEach(async () => {
    await testCourseService.deleteAll();
  });

  it('should error if the user is unauthenticated', async () => {
    return request(app.getHttpServer())
      .get(`${URL}/courseid`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the course does not exist', async () => {
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .get(`${URL}/missingcourseid`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'No Course found',
        error: 'Bad Request',
      });
  });

  it('should error if the course has sold out', async () => {
    const course = await testCourseService.createInPersonCourse([], { availablePlaces: 0 });
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .get(`${URL}/${course.id}`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Course is sold out',
        error: 'Bad Request',
      });
  });

  it('should return a unique client secret for use on the frontend', async () => {
    const course = await testCourseService.createInPersonCourse([], { availablePlaces: 10 });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(`${URL}/${course.id}`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data.clientSecret).toBeDefined();
    expect(typeof response.body.data.clientSecret).toBe('string');
  });

  it('should return the checkout session in the correct format', async () => {
    const course = await testCourseService.createInPersonCourse([], { availablePlaces: 10 });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(`${URL}/${course.id}`)
      .set('Cookie', [`authSession=${accessToken}`]);

    const responseObjectKeys = testHelpers.convertResponseKeysToFlatArray(response.body.data);
    expect(responseObjectKeys).toEqual([
      'clientSecret',
    ]);
  });
});
