import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import TestJwtService from '@test/utils/test-jwt-service';
import { TestCourseService } from '@test/utils/test-course-service';
import TestApp from '@test/utils/test-app';
import { TestCourseFeedbackService } from '@test/utils/test-course-feedback-service';
import { TestUserCourseService } from '@test/utils/test-user-course-service';
import { TestUserService } from '@test/utils/test-user-service';
import { faker } from '@faker-js/faker/locale/en_GB';
import { TestHelpers } from '@test/utils/test-helpers';

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

    const answerOne = { questionId: questions[0].id, answer: faker.word.words(2) };
    const answerTwo = { questionId: questions[1].id, answer: faker.number.int() };

    await request(app.getHttpServer())
      .put(`${URL}/${course.id}/feedback/answers`)
      .set('Cookie', [`authSession=${accessToken}`])
      .send({
        answers: [
          answerOne,
          answerTwo,
        ],
      })
      .expect(200);

    const responses = await testCourseFeedbackService.getResponsesForCourseByUser(course.id, user.id);

    expect(responses).toHaveLength(1);
    expect(responses[0].answers).toHaveLength(2);
    expect(responses[0].answers[0].questionId).toEqual(answerOne.questionId);
    expect(responses[0].answers[0].answer).toEqual(answerOne.answer);
    expect(responses[0].answers[1].questionId).toEqual(answerTwo.questionId);
    expect(responses[0].answers[1].answer).toEqual(answerTwo.answer);
  });

  it('should return a response in the correct format', async () => {
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
      .expect(200)
      .expect((response) => {
        const responseObjectKeys = testHelpers.convertResponseKeysToFlatArray(response.body.data);
        expect(responseObjectKeys).toEqual([
          'id',
          'courseId',
          'answers.0.questionId',
          'answers.0.question',
          'answers.0.answer',
        ]);
      });
  });
});