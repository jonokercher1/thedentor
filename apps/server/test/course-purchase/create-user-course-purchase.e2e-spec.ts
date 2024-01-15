import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestApiKeyService } from '@test/utils/test-api-key-service';
import TestApp from '@test/utils/test-app';
import { TestCourseService } from '@test/utils/test-course-service';
import TestDatabaseService from '@test/utils/test-database-service';
import { TestUserService } from '@test/utils/test-user-service';
import { faker } from '@faker-js/faker/locale/en_GB';
import { TestUserCourseService } from '@test/utils/test-user-course-service';

describe('Create user course purchase', () => {
  const URL = '/course';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testCourseService: TestCourseService;
  let testUserService: TestUserService;
  let testApiKeyService: TestApiKeyService;
  let testUserCourseService: TestUserCourseService;

  beforeAll(async () => {
    const testApp = new TestApp();
    testDatabaseService = new TestDatabaseService();
    testCourseService = new TestCourseService(testDatabaseService);
    testUserService = new TestUserService(testDatabaseService);
    testApiKeyService = new TestApiKeyService(testDatabaseService);
    testUserCourseService = new TestUserCourseService(testDatabaseService);

    app = await testApp.init();
  });

  beforeEach(async () => {
    await testCourseService.deleteAll();
  });

  it('should error if there is no api key used', async () => {
    const course = await testCourseService.createCourse();

    return request(app.getHttpServer())
      .put(`${URL}/${course.id}/purchase`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the api key used is invalid', async () => {
    const course = await testCourseService.createCourse();

    return request(app.getHttpServer())
      .put(`${URL}/${course.id}/purchase`)
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
    const course = await testCourseService.createCourse();
    const dentor = await testUserService.createDentor();
    const expiredApiKey = await testApiKeyService.createExpiredApiKeyForUser(dentor.id);

    return request(app.getHttpServer())
      .put(`${URL}/${course.id}/purchase`)
      .set({
        'x-api-key': expiredApiKey.key,
      })
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the course does not exist', async () => {
    const dentor = await testUserService.createDentor();
    const apiKey = await testApiKeyService.createValidApiKeyForUser(dentor.id);

    return request(app.getHttpServer())
      .put(`${URL}/invalidcourseid/purchase`)
      .set({
        'x-api-key': apiKey.key,
      })
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not Found',
      });
  });

  it('should error if the request body is invalid', async () => {
    const dentor = await testUserService.createDentor();
    const course = await testCourseService.createCourse(undefined, undefined, { dentorId: dentor.id });
    const apiKey = await testApiKeyService.createValidApiKeyForUser(dentor.id);

    return request(app.getHttpServer())
      .put(`${URL}/${course.id}/purchase`)
      .set({
        'x-api-key': apiKey.key,
      })
      .send({
        user: {
          email: 'invalidemail',
          name: 12,
        },
      })
      .expect(422)
      .expect({
        statusCode: 422,
        message: 'Unprocessable Entity',
        error: {
          user: {
            email: ['email must be an email'],
            name: ['name must be a string'],
          },
        },
      });
  });

  it('should error if the course is already owned by the user', async () => {
    const dentor = await testUserService.createDentor();
    const course = await testCourseService.createCourse(undefined, undefined, { dentorId: dentor.id });
    const apiKey = await testApiKeyService.createValidApiKeyForUser(dentor.id);
    const user = await testUserService.createDentist();
    await testUserService.purchaseCourse(course.id, user.id);

    return request(app.getHttpServer())
      .put(`${URL}/${course.id}/purchase`)
      .set({
        'x-api-key': apiKey.key,
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Bad Request',
      });
  });

  it('should error if the course is not owned by the dentor', async () => {
    const dentor = await testUserService.createDentor();
    const otherDentor = await testUserService.createDentor();
    const course = await testCourseService.createCourse(undefined, undefined, { dentorId: otherDentor.id });
    const apiKey = await testApiKeyService.createValidApiKeyForUser(dentor.id);

    return request(app.getHttpServer())
      .put(`${URL}/${course.id}/purchase`)
      .set({
        'x-api-key': apiKey.key,
      })
      .send({
        user: {
          email: faker.internet.email(),
        },
      })
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not Found',
      });
  });

  it('should create a user and purchase the course for them', async () => {
    const dentor = await testUserService.createDentor();
    const course = await testCourseService.createCourse(undefined, undefined, { dentorId: dentor.id });
    const apiKey = await testApiKeyService.createValidApiKeyForUser(dentor.id);

    const user = {
      email: faker.internet.email(),
    };


    await request(app.getHttpServer())
      .put(`${URL}/${course.id}/purchase`)
      .set({
        'x-api-key': apiKey.key,
      })
      .send({
        user,
      })
      .expect(204);

    const userAfterRequest = await testUserService.findUserByEmail(user.email);

    expect(userAfterRequest).toBeDefined();
    expect(userAfterRequest.email).toEqual(user.email);
    expect(userAfterRequest.name).toBeNull();

    const userCourses = await testUserCourseService.getCoursesPurchasedByUser(userAfterRequest.id);

    expect(userCourses.length).toEqual(1);
    expect(userCourses[0].id).toEqual(course.id);
  });

  it('should purchase a course for an existing user', async () => {
    const dentor = await testUserService.createDentor();
    const course = await testCourseService.createCourse(undefined, undefined, { dentorId: dentor.id });
    const apiKey = await testApiKeyService.createValidApiKeyForUser(dentor.id);
    const user = await testUserService.createDentist();

    await request(app.getHttpServer())
      .put(`${URL}/${course.id}/purchase`)
      .set({
        'x-api-key': apiKey.key,
      })
      .send({
        user: {
          email: user.email,
        },
      })
      .expect(204);

    const userCourses = await testUserCourseService.getCoursesPurchasedByUser(user.id);

    expect(userCourses.length).toEqual(1);
    expect(userCourses[0].id).toEqual(course.id);
  });
});