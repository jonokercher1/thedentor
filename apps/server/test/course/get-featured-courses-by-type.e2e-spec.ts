import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import { TestCategoryService } from '@test/utils/test-category-service';
import TestJwtService from '@test/utils/test-jwt-service';
import { TestCourseService } from '@test/utils/test-course-service';
import { CourseType } from '@prisma/client';
import TestApp from '@test/utils/test-app';
import * as dayjs from 'dayjs';
import { TestHelpers } from '@test/utils/test-helpers';

describe('Get Featured Courses By Type', () => {
  const URL = '/course/featured';
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
    return request(app.getHttpServer())
      .get(`${URL}/${CourseType.InPerson}`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the course type is invalid', async () => {
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .get(`${URL}/invalidtype`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Validation failed (enum string is expected)',
        error: 'Bad Request',
      });
  });

  it('should only return courses that match the specified type', async () => {
    const featuredUntil = dayjs().add(1, 'day').toDate();
    const videoCourse = await testCourseService.createVideoCourse([], { featuredUntil });
    await testCourseService.createInPersonCourse([], { featuredUntil });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(`${URL}/${CourseType.Video}`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].id).toEqual(videoCourse.id);
  });

  it('should only return courses that are currently featured', async () => {
    const featuredVideoCourse = await testCourseService.createVideoCourse([], { featuredUntil: dayjs().add(1, 'day').toDate() });
    await testCourseService.createVideoCourse([], { featuredUntil: dayjs().subtract(1, 'day').toDate() });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(`${URL}/${CourseType.Video}`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].id).toEqual(featuredVideoCourse.id);
  });

  it('should paginate the course results', async () => {
    const featuredVideoCourseOne = await testCourseService.createVideoCourse([], { featuredUntil: dayjs().add(1, 'day').toDate() });
    const featuredVideoCourseTwo = await testCourseService.createVideoCourse([], { featuredUntil: dayjs().add(1, 'day').toDate() });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(`${URL}/${CourseType.Video}?page=1&perPage=1`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].id).toEqual(featuredVideoCourseTwo.id);
    expect(response.body.page).toEqual(1);
    expect(response.body.total).toEqual(2);

    const responseTwo = await request(app.getHttpServer())
      .get(`${URL}/${CourseType.Video}?page=2&perPage=1`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body.message).toEqual('success');
    expect(responseTwo.body.data).toHaveLength(1);

    expect(responseTwo.body.data[0].id).toEqual(featuredVideoCourseOne.id);
    expect(responseTwo.body.page).toEqual(2);
    expect(responseTwo.body.total).toEqual(2);
  });

  it('should return courses in the correct format', async () => {
    const courseCategory = await testCategoryService.createCategory();
    await testCourseService.createVideoCourse([courseCategory.slug], { featuredUntil: dayjs().add(1, 'day').toDate() });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(`${URL}/${CourseType.Video}`)
      .set('Cookie', [`authSession=${accessToken}`]);

    const responseObjectKeys = testHelpers.convertResponseKeysToFlatArray(response.body.data[0]);
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
      'categories.0.slug',
      'categories.0.label',
    ]);
  });
});