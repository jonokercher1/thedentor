import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import TestJwtService from '@test/utils/test-jwt-service';
import { TestCourseService } from '@test/utils/test-course-service';
import TestApp from '@test/utils/test-app';
import { TestHelpers } from '@test/utils/test-helpers';
import { TestUserService } from '@test/utils/test-user-service';

describe('Create course purchase intent', () => {
  const URL = '/course/checkout';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testJwtService: TestJwtService;
  let testCourseService: TestCourseService;
  let testUserService: TestUserService;
  const testHelpers = new TestHelpers();

  beforeAll(async () => {
    const testApp = new TestApp();
    testDatabaseService = new TestDatabaseService();
    testJwtService = new TestJwtService();
    testCourseService = new TestCourseService(testDatabaseService);
    testUserService = new TestUserService(testDatabaseService);

    app = await testApp.init();
  });

  it('should error if the user is unauthenticated', async () => {
    const course = await testCourseService.createCourse();

    return request(app.getHttpServer())
      .post(`${URL}/${course.id}/intent`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the course is already owned by the user', async () => {
    const course = await testCourseService.createCourse();
    const user = await testUserService.createDentist();
    await testUserService.purchaseCourse(course.id, user.id);
    const accessToken = await testJwtService.generateAccessToken(user);

    return request(app.getHttpServer())
      .post(`${URL}/${course.id}/intent`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Course is already owned',
        error: 'Bad Request',
      });
  });

  // TODO: should return a 404
  it('should error if the course does not exist', async () => {
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .post(`${URL}/invalidcourseid/intent`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'No Course found',
        error: 'Bad Request',
      });
  });

  it('should return a client secret if the course is not owned by the user', async () => {
    const course = await testCourseService.createCourse();
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .post(`${URL}/${course.id}/intent`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(201);
    expect(response.body.message).toEqual('success');
    expect(response.body.data.clientSecret).toBeDefined();
  });

  it('should return a response in the correct format', async () => {
    const course = await testCourseService.createCourse();
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .post(`${URL}/${course.id}/intent`)
      .set('Cookie', [`authSession=${accessToken}`]);

    const responseObjectKeys = testHelpers.convertResponseKeysToFlatArray(response.body.data);
    expect(responseObjectKeys).toEqual([
      'clientSecret',
    ]);
  });
});