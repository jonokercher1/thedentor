import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '../utils/test-database-service';
import TestApp from '@test/utils/test-app';

describe('Get Search Results', () => {
  const URL = '/search';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;

  beforeAll(async () => {
    const testApp = new TestApp();

    testDatabaseService = new TestDatabaseService();

    app = await testApp.init();
  });

  it('test', async () => {
    const response = await request(app.getHttpServer())
      .get(URL);
    console.log('🚀 ~ file: get-search-results.e2e-spec.ts:22 ~ it ~ response:', response.statusCode);
  });
});