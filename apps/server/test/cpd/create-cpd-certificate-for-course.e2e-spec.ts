import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import TestJwtService from '@test/utils/test-jwt-service';
import { TestCourseService } from '@test/utils/test-course-service';
import TestApp from '@test/utils/test-app';
import { TestCpdCertificateService } from '@test/utils/test-cpd-certificate-service';
import { TestUserService } from '@test/utils/test-user-service';
import { TestCourseFeedbackService } from '@test/utils/test-course-feedback-service';
import { TestHelpers } from '@test/utils/test-helpers';

describe('Create CPD Certificate For Course', () => {
  const URL = '/cpd-certificate';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testJwtService: TestJwtService;
  let testCourseService: TestCourseService;
  let testCpdCertificateService: TestCpdCertificateService;
  let testUserService: TestUserService;
  let testCourseFeedbackService: TestCourseFeedbackService;
  const testHelpers = new TestHelpers();

  beforeAll(async () => {
    const testApp = new TestApp();
    testDatabaseService = new TestDatabaseService();
    testJwtService = new TestJwtService();
    testCourseService = new TestCourseService(testDatabaseService);
    testCpdCertificateService = new TestCpdCertificateService(testDatabaseService);
    testUserService = new TestUserService(testDatabaseService);
    testCourseFeedbackService = new TestCourseFeedbackService(testDatabaseService);

    app = await testApp.init();
  });

  beforeEach(async () => {
    await testCpdCertificateService.deleteAll();
  });

  it('should error if the user is unauthenticated', async () => {
    return request(app.getHttpServer())
      .put(URL)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the course does not exist', async () => {
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .put(URL)
      .send({
        courseId: 'invalid-course-id',
      })
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not Found',
      });
  });

  it('should error if the user has not submitted feedback for the course', async () => {
    const dentist = await testUserService.createDentist();
    const course = await testCourseService.createCourse();
    const accessToken = await testJwtService.generateAccessToken(dentist);

    return request(app.getHttpServer())
      .put(URL)
      .send({
        courseId: course.id,
      })
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Bad Request',
      });
  });

  it('should error if the user already has a certificate for the course', async () => {
    const dentist = await testUserService.createDentist();
    const course = await testCourseService.createCourse();
    const accessToken = await testJwtService.generateAccessToken(dentist);
    await testCpdCertificateService.createUserCertificateForCourse(dentist.id, course.id);

    return request(app.getHttpServer())
      .put(URL)
      .send({
        courseId: course.id,
      })
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Bad Request',
      });
  });

  it('should store the certificate without a fileUrl', async () => {
    const dentist = await testUserService.createDentist();
    const course = await testCourseService.createCourse();
    await testCourseFeedbackService.submitUserAnswersForCourse(dentist.id, course.id);
    const accessToken = await testJwtService.generateAccessToken(dentist);

    const res = await request(app.getHttpServer())
      .put(URL)
      .send({
        courseId: course.id,
      })
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect((res) => {
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.fileUrl).toBeNull();
      });

    const certificate = await testCpdCertificateService.getCertificateById(res.body.data.id);

    expect(certificate).toBeDefined();
    expect(certificate.fileUrl).toBeNull();
  });

  it('should return the correct format response', async () => {
    const dentist = await testUserService.createDentist();
    const course = await testCourseService.createCourse();
    await testCourseFeedbackService.submitUserAnswersForCourse(dentist.id, course.id);
    const accessToken = await testJwtService.generateAccessToken(dentist);

    return request(app.getHttpServer())
      .put(URL)
      .send({
        courseId: course.id,
      })
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect(async (res) => {
        const responseBodyKeys = testHelpers.convertResponseKeysToFlatArray(res.body.data);

        expect(responseBodyKeys).toEqual([
          'id',
          'fileUrl',
        ]);
      });
  });
});