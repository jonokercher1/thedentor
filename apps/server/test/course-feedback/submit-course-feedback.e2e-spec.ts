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
import { faker } from '@faker-js/faker/locale/en_GB';

describe('Submit Course Feedback', () => {
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
      .put(`${URL}/${course.id}/feedback/answers`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  // TOOD: need to properly format the response in body-validation-pipe.ts
  xit('should error if the request body is invalid', async () => {
    const course = await testCourseService.createCourse();
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .put(`${URL}/${course.id}/feedback/answers`)
      .set('Cookie', [`authSession=${accessToken}`])
      .send({
        answers: [
          { questionId: '123', answer: 'test' },
        ],
      })
      .expect(422)
      .expect({
        statusCode: 422,
        message: 'Unprocessible Entity',
        error: '',
      });
  });

  it('should error if the course does not exist', async () => {
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .put(`${URL}/invalidcourseid/feedback/answers`)
      .set('Cookie', [`authSession=${accessToken}`])
      .send({
        answers: [
          { questionId: faker.string.uuid(), answer: faker.word.words(2) },
        ],
      })
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not Found',
      });
  });

  it('should error if the user has not attended the course', async () => {
    const course = await testCourseService.createCourse();
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .put(`${URL}/${course.id}/feedback/answers`)
      .set('Cookie', [`authSession=${accessToken}`])
      .send({
        answers: [
          { questionId: faker.string.uuid(), answer: faker.word.words(2) },
        ],
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Bad Request',
      });
  });

  it('should error if the user has already submitted feedback for the course', async () => {
    const course = await testCourseService.createCourse();
    const user = await testUserService.createDentist();
    const accessToken = await testJwtService.generateAccessToken(user);

    await testCourseFeedbackService.submitUserAnswersForCourse(user.id, course.id, [
      { questionId: faker.string.uuid(), answer: faker.word.words(2) },
    ]);

    return request(app.getHttpServer())
      .put(`${URL}/${course.id}/feedback/answers`)
      .set('Cookie', [`authSession=${accessToken}`])
      .send({
        answers: [
          { questionId: faker.string.uuid(), answer: faker.word.words(2) },
        ],
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Bad Request',
      });

  });

  it('should successfully store the users submission', async () => {
    const course = await testCourseService.createCourse();
    const user = await testUserService.createDentist();
    const accessToken = await testJwtService.generateAccessToken(user);
    await testCourseFeedbackService.createQuestionsForCourse(course.id);
    const questions = await testCourseFeedbackService.getQuestionsForCourse(course.id);

    await testUserCourseService.markUserAsAttendedCourse(user.id, course.id);

    const answer = { questionId: questions[0].id, answer: faker.word.words(2) };

    await request(app.getHttpServer())
      .put(`${URL}/${course.id}/feedback/answers`)
      .set('Cookie', [`authSession=${accessToken}`])
      .send({
        answers: [
          answer,
        ],
      })
      .expect(204);

    const responses = await testCourseFeedbackService.getResponsesForCourseByUser(course.id, user.id);
    expect(responses).toHaveLength(1);
    expect((responses[0].answers as any).answer).toEqual(answer.answer);
  });
});