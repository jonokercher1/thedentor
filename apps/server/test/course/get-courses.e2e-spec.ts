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
import { TestUserService } from '@test/utils/test-user-service';

describe('Get Courses', () => {
  const URL = '/course';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testCategoryService: TestCategoryService;
  let testJwtService: TestJwtService;
  let testCourseService: TestCourseService;
  let testUserService: TestUserService;
  const testHelpers = new TestHelpers();

  beforeAll(async () => {
    const testApp = new TestApp();
    testDatabaseService = new TestDatabaseService();
    testCategoryService = new TestCategoryService(testDatabaseService);
    testJwtService = new TestJwtService();
    testCourseService = new TestCourseService(testDatabaseService);
    testUserService = new TestUserService(testDatabaseService);

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

  it('should paginate the course results', async () => {
    const videoCourseOne = await testCourseService.createVideoCourse([], { createdAt: dayjs().add(1, 'day').toDate() });
    const videoCourseTwo = await testCourseService.createVideoCourse([], { createdAt: dayjs().subtract(1, 'day').toDate() });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(`${URL}?page=1&perPage=1`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].id).toEqual(videoCourseOne.id);
    expect(response.body.page).toEqual(1);
    expect(response.body.total).toEqual(2);

    const responseTwo = await request(app.getHttpServer())
      .get(`${URL}?page=2&perPage=1`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body.message).toEqual('success');
    expect(responseTwo.body.data).toHaveLength(1);

    expect(responseTwo.body.data[0].id).toEqual(videoCourseTwo.id);
    expect(responseTwo.body.page).toEqual(2);
    expect(responseTwo.body.total).toEqual(2);
  });

  it('should combine both type of courses when a type filter isnt specified', async () => {
    const videoCourse = await testCourseService.createVideoCourse([], { createdAt: dayjs().subtract(1, 'day').toDate() });
    const inPersonCourse = await testCourseService.createInPersonCourse([], { createdAt: dayjs().add(1, 'day').toDate() });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(`${URL}?page=1&perPage=2`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(2);

    const responseIds = response.body.data.map(d => d.id);
    expect(responseIds.includes(videoCourse.id)).toBeTruthy();
    expect(responseIds.includes(inPersonCourse.id)).toBeTruthy();
  });

  it('should allow filtering by type', async () => {
    await testCourseService.createVideoCourse([], { createdAt: dayjs().subtract(1, 'day').toDate() });
    const inPersonCourse = await testCourseService.createInPersonCourse([], { createdAt: dayjs().add(1, 'day').toDate() });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(`${URL}?page=1&perPage=2&type=${CourseType.InPerson}`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].id).toEqual(inPersonCourse.id);
  });

  it('should allow filtering by dentor Id', async () => {
    const dentor = await testUserService.createDentor();
    const secondDentor = await testUserService.createDentor();
    const dentorCourse = await testCourseService.createInPersonCourse([], { dentorId: dentor.id });
    const secondDentorCourse = await testCourseService.createInPersonCourse([], { dentorId: secondDentor.id });
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .get(`${URL}?page=1&perPage=2&dentors[]=${dentor.id}`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('success');
        expect(res.body.data).toHaveLength(1);
        expect(res.body.data[0].id).toEqual(dentorCourse.id);
        expect(res.body.data[0].id).not.toEqual(secondDentorCourse.id);
      });
  });

  it('should allow filtering by multiple dentors', async () => {
    const dentor = await testUserService.createDentor();
    const secondDentor = await testUserService.createDentor();
    const thirdDentor = await testUserService.createDentor();
    const firstDentorCourse = await testCourseService.createInPersonCourse([], { dentorId: dentor.id });
    const secondDentorCourse = await testCourseService.createInPersonCourse([], { dentorId: secondDentor.id });
    const thirdDentorCourse = await testCourseService.createInPersonCourse([], { dentorId: thirdDentor.id });
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .get(`${URL}?page=1&perPage=5&dentors[]=${dentor.id}&dentors[]=${secondDentor.id}`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('success');
        expect(res.body.data).toHaveLength(2);

        const returnedCourseIds = res.body.data.map(d => d.id);
        expect(returnedCourseIds.includes(firstDentorCourse.id)).toBeTruthy();
        expect(returnedCourseIds.includes(secondDentorCourse.id)).toBeTruthy();
        expect(returnedCourseIds.includes(thirdDentorCourse.id)).toBeFalsy();
      });
  });

  it('should allow changing the response order by any field', async () => {
    const firstInPersonCourse = await testCourseService.createInPersonCourse([], { createdAt: dayjs().add(1, 'day').toDate(), startDate: dayjs().subtract(1, 'day').toDate() });
    const secondInPersonCourse = await testCourseService.createInPersonCourse([], { createdAt: dayjs().subtract(1, 'day').toDate(), startDate: dayjs().add(1, 'day').toDate() });
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(`${URL}?page=1&perPage=2`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(response.body.data[0].id).toEqual(firstInPersonCourse.id);
    expect(response.body.data[1].id).toEqual(secondInPersonCourse.id);

    // order by the startdate instead
    const responseTwo = await request(app.getHttpServer())
      .get(`${URL}?page=1&perPage=2&orderBy=startDate&order=desc`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(responseTwo.body.data[0].id).toEqual(secondInPersonCourse.id);
    expect(responseTwo.body.data[1].id).toEqual(firstInPersonCourse.id);
  });

  it('should return courses in the correct format', async () => {
    const courseCategory = await testCategoryService.createCategory();
    await testCourseService.createVideoCourse([courseCategory.slug], { featuredUntil: dayjs().add(1, 'day').toDate() });
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
      'dentor.bio',
      'categories.0.slug',
      'categories.0.label',
    ]);
  });
});