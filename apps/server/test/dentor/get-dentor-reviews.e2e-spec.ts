import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import TestJwtService from '@test/utils/test-jwt-service';
import TestApp from '@test/utils/test-app';
import { TestHelpers } from '@test/utils/test-helpers';
import { TestUserService } from '@test/utils/test-user-service';
import { TestReviewService } from '@test/utils/test-review-service';
import * as dayjs from 'dayjs';

describe('Get Dentor Reviews', () => {
  const URL = '/dentor';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testJwtService: TestJwtService;
  let testUserService: TestUserService;
  let testReviewService: TestReviewService;
  let accessToken: string;
  const testHelpers = new TestHelpers();

  beforeAll(async () => {
    const testApp = new TestApp();
    testDatabaseService = new TestDatabaseService();
    testUserService = new TestUserService(testDatabaseService);
    testReviewService = new TestReviewService(testDatabaseService);
    testJwtService = new TestJwtService();
    accessToken = await testJwtService.generateAccessToken();

    app = await testApp.init();
  });

  beforeEach(async () => {
    await testReviewService.deleteAll();
  });

  it('should error if the user is unauthenticated', async () => {
    const dentor = await testUserService.createDentor();

    return request(app.getHttpServer())
      .get(`${URL}/${dentor.id}/reviews`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the dentor does not exist', async () => {
    return request(app.getHttpServer())
      .get(`${URL}/invaliddentorid/reviews`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not Found',
      });
  });

  it('should error if the dentor is not a dentor', async () => {
    const dentist = await testUserService.createDentist();

    return request(app.getHttpServer())
      .get(`${URL}/${dentist.id}/reviews`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not Found',
      });
  });

  it('should return only reviews about the given dentor', async () => {
    const dentor = await testUserService.createDentor();
    const review = await testReviewService.createReview({ dentorId: dentor.id });

    const anotherDentor = await testUserService.createDentor();
    await testReviewService.createReview({ dentorId: anotherDentor.id });

    return request(app.getHttpServer())
      .get(`${URL}/${dentor.id}/reviews`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveLength(1);
        expect(res.body.data[0].id).toEqual(review.id);
      });
  });

  it('should return a response with the correct format', async () => {
    const dentor = await testUserService.createDentor();
    await testReviewService.createReview({ dentorId: dentor.id });

    return request(app.getHttpServer())
      .get(`${URL}/${dentor.id}/reviews`)
      .set('Cookie', [`authSession=${accessToken}`])
      .expect(200)
      .expect((res) => {
        const responseKeys = testHelpers.convertResponseKeysToFlatArray(res.body.data[0]);

        expect(responseKeys).toEqual([
          'id',
          'title',
          'content',
          'rating',
          'dentor.id',
          'dentor.name',
          'dentor.gdcNumber',
          'dentor.bio',
        ]);
      });
  });

  it('should paginate the dentors reviews', async () => {
    const dentor = await testUserService.createDentor();
    const firstReview = await testReviewService.createReview({ dentorId: dentor.id, rating: 5 });
    const secondReview = await testReviewService.createReview({ dentorId: dentor.id, rating: 3 });
    const thirdReview = await testReviewService.createReview({ dentorId: dentor.id, rating: 2 });

    const firstResponse = await request(app.getHttpServer())
      .get(`${URL}/${dentor.id}/reviews?perPage=1&page=1&orderBy=rating&order=desc`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(firstResponse.body.data).toHaveLength(1);
    expect(firstResponse.body.data[0].id).toEqual(firstReview.id);

    const secondResponse = await request(app.getHttpServer())
      .get(`${URL}/${dentor.id}/reviews?perPage=1&page=2&orderBy=rating&order=desc`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(secondResponse.body.data).toHaveLength(1);
    expect(secondResponse.body.data[0].id).toEqual(secondReview.id);

    const thirdResponse = await request(app.getHttpServer())
      .get(`${URL}/${dentor.id}/reviews?perPage=1&page=3&orderBy=rating&order=desc`)
      .set('Cookie', [`authSession=${accessToken}`]);

    expect(thirdResponse.body.data).toHaveLength(1);
    expect(thirdResponse.body.data[0].id).toEqual(thirdReview.id);
  });
});
