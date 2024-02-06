import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import TestJwtService from '@test/utils/test-jwt-service';
import TestApp from '@test/utils/test-app';
import { TestCpdCertificateService } from '@test/utils/test-cpd-certificate-service';
import { TestUserService } from '@test/utils/test-user-service';
import { TestHelpers } from '@test/utils/test-helpers';
import { TestCpdCertificateTemplateService } from '@test/utils/test-cpd-certificate-template-service';

describe('Get CPD Certificate', () => {
  const URL = '/cpd-certificate';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testJwtService: TestJwtService;
  let testCpdCertificateService: TestCpdCertificateService;
  let testUserService: TestUserService;
  let testCpdCertificateTemplateService: TestCpdCertificateTemplateService;
  const testHelpers = new TestHelpers();

  beforeAll(async () => {
    const testApp = new TestApp();
    testDatabaseService = new TestDatabaseService();
    testJwtService = new TestJwtService();
    testCpdCertificateService = new TestCpdCertificateService(testDatabaseService);
    testUserService = new TestUserService(testDatabaseService);
    testCpdCertificateTemplateService = new TestCpdCertificateTemplateService(testDatabaseService);

    app = await testApp.init();
  });

  beforeEach(async () => {
    await testCpdCertificateService.deleteAll();
  });

  it('should error if the user is unauthenticated', async () => {
    const cpdCertificate = await testCpdCertificateService.createUserCertificateForCourse();

    return request(app.getHttpServer())
      .get(`${URL}/${cpdCertificate.id}`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the certificate does not exist', async () => {
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .get(`${URL}/invalid-certificate-id`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not Found',
      });
  });

  it('should generate and return the fileUrl if one was not set before', async () => {
    const dentist = await testUserService.createDentist();
    const cpdCertificate = await testCpdCertificateService.createUserCertificateForCourse(dentist.id);
    const accessToken = await testJwtService.generateAccessToken(dentist);
    await testCpdCertificateTemplateService.createTemplate({ courseId: cpdCertificate.courseId });

    expect(cpdCertificate.fileUrl).toBeNull();

    return request(app.getHttpServer())
      .get(`${URL}/${cpdCertificate.id}`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect(async (res) => {
        expect(res.body.data.fileUrl).not.toBeNull();
      });
  });

  it('should return the correct format response', async () => {
    const dentist = await testUserService.createDentist();
    const cpdCertificate = await testCpdCertificateService.createUserCertificateForCourse(dentist.id);
    const accessToken = await testJwtService.generateAccessToken(dentist);
    await testCpdCertificateTemplateService.createTemplate({ courseId: cpdCertificate.courseId });

    return request(app.getHttpServer())
      .get(`${URL}/${cpdCertificate.id}`)
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