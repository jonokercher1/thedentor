import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import { TestCategoryService } from '@test/utils/test-category-service';
import TestJwtService from '@test/utils/test-jwt-service';
import { TestCourseService } from '@test/utils/test-course-service';
import TestApp from '@test/utils/test-app';
import { TestHelpers } from '@test/utils/test-helpers';

describe('Get Course', () => {
  const URL = '/course';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testCategoryService: TestCategoryService;
  let testJwtService: TestJwtService;
  let testCourseService: TestCourseService;
  const testHelpers = new TestHelpers();

  beforeAll(async () => {
    const testApp = new TestApp();
    testDatabaseService = new TestDatabaseService();
    testCategoryService = new TestCategoryService(testDatabaseService);
    testJwtService = new TestJwtService();
    testCourseService = new TestCourseService(testDatabaseService);

    app = await testApp.init();
  });

  beforeEach(async () => {
    await testCategoryService.deleteAll();
    await testCourseService.deleteAll();
  });

  it('should error if the user is unauthenticated', async () => {
    const course = await testCourseService.createCourse();
    return request(app.getHttpServer())
      .get(`${URL}/${course.id}`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the course doesnt exist', async () => {
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .get(`${URL}/invalidcourseid`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not Found',
      });
  });

  it('should return the correct format response', async () => {
    const courseCategory = await testCategoryService.createCategory();
    const course = await testCourseService.createInPersonCourse([courseCategory.slug]);
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .get(`${URL}/${course.id}`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect((response) => {
        const responseObjectKeys = testHelpers.convertResponseKeysToFlatArray(response.body.data);
        expect(responseObjectKeys).toEqual([
          'id',
          'name',
          'description',
          'cpdValue',
          'startDate',
          'endDate',
          'dentor.id',
          'dentor.name',
          'dentor.gdcNumber',
          'dentor.bio',
          'categories.0.slug',
          'categories.0.label',
        ]);
      });
  });
});