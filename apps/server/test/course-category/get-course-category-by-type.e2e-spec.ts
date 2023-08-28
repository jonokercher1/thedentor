import * as request from 'supertest';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import TestDatabaseService from '@test/utils/test-database-service';
import { faker } from '@faker-js/faker/locale/en_GB';
import { BodyValidationPipe } from '@/common/pipes/body-validation-pipe';
import { Reflector } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { TestCategoryService } from '@test/utils/test-category-service';
import TestJwtService from '@test/utils/test-jwt-service';

describe('Get Course Categories', () => {
  const URL = '/course-category';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testCategoryService: TestCategoryService;
  let testJwtService: TestJwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    testDatabaseService = new TestDatabaseService();
    testCategoryService = new TestCategoryService(testDatabaseService);
    testJwtService = new TestJwtService();

    app.useGlobalPipes(new BodyValidationPipe());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), { excludeExtraneousValues: true }));

    await app.init();
  });

  beforeEach(async () => {
    await testCategoryService.deleteAll();
  });

  it('should error if the user is unauthenticated', async () => {
    return request(app.getHttpServer())
      .get(URL)
      .send({
        password: faker.string.sample(4),
      })
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should return all categories when no type is specified', async () => {
    const categoryOne = await testCategoryService.createCategory();
    const categoryTwo = await testCategoryService.createCategory();
    const accessToken = await testJwtService.generateAccessToken();

    const response = await request(app.getHttpServer())
      .get(URL)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toHaveLength(2);

    const returnedTokenSlugs = response.body.data.map(i => i.slug);
    expect(returnedTokenSlugs.includes(categoryOne.slug)).toBeTruthy();
    expect(returnedTokenSlugs.includes(categoryTwo.slug)).toBeTruthy();
  });

  it('should error if the course type is invalid', async () => {
    const accessToken = await testJwtService.generateAccessToken();

    return request(app.getHttpServer())
      .get(`${URL}?type=invalidtype`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(422)
      .expect({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: {
          type: ['type must be one of the following values: Video, InPerson'],
        },
      });
  });

  it.todo('should return categories related to video content');
  it.todo('should return categories related to in-person content');

  // we cannot do this until the other course relationships are introduced
  it.todo('should not return categories without related content');
});