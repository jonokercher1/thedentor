import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import TestJwtService from '@test/utils/test-jwt-service';
import { TestCourseService } from '@test/utils/test-course-service';
import TestApp from '@test/utils/test-app';
import { TestCourseFeedbackService } from '@test/utils/test-course-feedback-service';
import { TestUserCourseService } from '@test/utils/test-user-course-service';
import { TestUserService } from '@test/utils/test-user-service';
import { TestHelpers } from '@test/utils/test-helpers';

describe('Get Course Feedback Questions', () => {
  const URL = '/course';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testJwtService: TestJwtService;
  let testCourseService: TestCourseService;
  let testCourseFeedbackService: TestCourseFeedbackService;
  let testUserCourseService: TestUserCourseService;
  let testUserService: TestUserService;
  const testHelpers = new TestHelpers();

  beforeAll(async () => {
    const testApp = new TestApp();
    testDatabaseService = new TestDatabaseService();
    testJwtService = new TestJwtService();
    testCourseService = new TestCourseService(testDatabaseService);
    testCourseFeedbackService = new TestCourseFeedbackService(testDatabaseService);
    testUserCourseService = new TestUserCourseService(testDatabaseService);
    testUserService = new TestUserService(testDatabaseService);

    app = await testApp.init();
  });


  it('should error if the user is unauthenticated', async () => {
    const course = await testCourseService.createCourse();
    return request(app.getHttpServer())
      .get(`${URL}/${course.id}/feedback/questions`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the course does not exist', async () => {
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .get(`${URL}/123/feedback/questions`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not Found',
      });
  });

  it('should error if the user has not attended the course', async () => {
    const accessToken = await testJwtService.generateAccessToken();
    const course = await testCourseService.createCourse();

    return request(app.getHttpServer())
      .get(`${URL}/${course.id}/feedback/questions`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Bad Request',
      });
  });

  it('should return the course feedback questions in the correct order', async () => {
    const user = await testUserService.createDentist();
    const accessToken = await testJwtService.generateAccessToken(user);
    const course = await testCourseService.createCourse();
    await testCourseFeedbackService.createQuestionsForCourse(course.id, 3);
    await testUserCourseService.markUserAsAttendedCourse(user.id, course.id);

    return request(app.getHttpServer())
      .get(`${URL}/${course.id}/feedback/questions`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveLength(3);
        expect(res.body.data[0].order).toBe(0);
        expect(res.body.data[1].order).toBe(1);
        expect(res.body.data[2].order).toBe(2);
      });
  });

  it('should return a response with the correct format', async () => {
    const user = await testUserService.createDentist();
    const accessToken = await testJwtService.generateAccessToken(user);
    const course = await testCourseService.createCourse();
    await testCourseFeedbackService.createQuestionsForCourse(course.id, 3);
    await testUserCourseService.markUserAsAttendedCourse(user.id, course.id);

    return request(app.getHttpServer())
      .get(`${URL}/${course.id}/feedback/questions`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveLength(3);
        const responseKeys = testHelpers.convertResponseKeysToFlatArray(res.body.data[0]);
        expect(responseKeys).toEqual(['id', 'question', 'type', 'order']);
      });

  });

  it('should paginate the questions', async () => {
    const user = await testUserService.createDentist();
    const accessToken = await testJwtService.generateAccessToken(user);
    const course = await testCourseService.createCourse();
    await testCourseFeedbackService.createQuestionsForCourse(course.id, 3);
    await testUserCourseService.markUserAsAttendedCourse(user.id, course.id);

    const firstResponse = await request(app.getHttpServer())
      .get(`${URL}/${course.id}/feedback/questions?perPage=1&page=1`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(firstResponse.body.data).toHaveLength(1);
    expect(firstResponse.body.data[0].order).toBe(0);

    const secondResponse = await request(app.getHttpServer())
      .get(`${URL}/${course.id}/feedback/questions?perPage=1&page=2`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(secondResponse.body.data).toHaveLength(1);
    expect(secondResponse.body.data[0].order).toBe(1);

    const thirdResponse = await request(app.getHttpServer())
      .get(`${URL}/${course.id}/feedback/questions?perPage=1&page=3`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(thirdResponse.body.data).toHaveLength(1);
    expect(thirdResponse.body.data[0].order).toBe(2);
  });
});
