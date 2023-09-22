import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import TestDatabaseService from '@test/utils/test-database-service';
import TestJwtService from '@test/utils/test-jwt-service';
import { TestCourseService } from '@test/utils/test-course-service';
import TestApp from '@test/utils/test-app';

describe('Get Course Videos', () => {
  const URL = '/course-video';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testJwtService: TestJwtService;
  let testCourseService: TestCourseService;

  beforeAll(async () => {
    const testApp = new TestApp();
    testDatabaseService = new TestDatabaseService();
    testJwtService = new TestJwtService();
    testCourseService = new TestCourseService(testDatabaseService);

    app = await testApp.init();
  });

  beforeEach(async () => {
    // delete all the videos
  });

  it.todo('should not return the video url if the user is not logged in');
  it.todo('should return the video url if the user is logged in');
  it.todo('should error if the course id is not a valid uuid');
  it.todo('should error if the course id is not a valid uuid');
});