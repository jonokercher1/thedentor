import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import { TestCategoryService } from '@test/utils/test-category-service';
import TestJwtService from '@test/utils/test-jwt-service';
import { TestCourseService } from '@test/utils/test-course-service';
import TestApp from '@test/utils/test-app';
import * as dayjs from 'dayjs';
import { TestHelpers } from '@test/utils/test-helpers';

describe('Get Upcoming In Person Courses', () => {
  const URL = '/course/in-person/upcoming';
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
      .get(URL)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should paginate the upcoming course results', async () => {
    const inPersonCourseOne = await testCourseService.createInPersonCourse([], { startDate: dayjs().add(1, 'day').toDate() });
    const inPersonCourseTwo = await testCourseService.createInPersonCourse([], { startDate: dayjs().add(2, 'day').toDate() });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(`${URL}?page=1&perPage=1`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].id).toEqual(inPersonCourseOne.id);
    expect(response.body.page).toEqual(1);
    expect(response.body.total).toEqual(2);

    const responseTwo = await request(app.getHttpServer())
      .get(`${URL}?page=2&perPage=1`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body.message).toEqual('success');
    expect(responseTwo.body.data).toHaveLength(1);

    expect(responseTwo.body.data[0].id).toEqual(inPersonCourseTwo.id);
    expect(responseTwo.body.page).toEqual(2);
    expect(responseTwo.body.total).toEqual(2);
  });

  it('should not return courses that start in the past', async () => {
    // Create a course that started yesterday
    await testCourseService.createInPersonCourse([], { startDate: dayjs().subtract(1, 'day').toDate() });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(URL)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(0);

  });

  it('should return the courses that happen soonist, first', async () => {
    const firstCourse = await testCourseService.createInPersonCourse([], {
      startDate: dayjs().add(1, 'day').toDate(),
      createdAt: dayjs().subtract(1, 'day').toDate(), // was only created yesterday
    });
    const secondCourse = await testCourseService.createInPersonCourse([], {
      startDate: dayjs().add(2, 'day').toDate(),
      createdAt: dayjs().subtract(1, 'week').toDate(), // was created last week but starts in 2 days
    });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(URL)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(2);

    expect(response.body.data[0].id).toEqual(firstCourse.id);
    expect(response.body.data[1].id).toEqual(secondCourse.id);
  });

  it('should return courses in the correct format', async () => {
    const courseCategory = await testCategoryService.createCategory();
    await testCourseService.createInPersonCourse([courseCategory.slug], { startDate: dayjs().add(1, 'day').toDate() });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(URL)
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