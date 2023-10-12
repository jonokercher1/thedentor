import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/en_GB';
import TestDatabaseService from '../utils/test-database-service';
import TestApp from '@test/utils/test-app';
import { TestPasswordResetTokenService } from '@test/utils/test-password-reset-token-service';
import * as dayjs from 'dayjs';

describe('Reset Password', () => {
  const URL = '/auth/password-reset';
  let app: INestApplication;
  let testDatabaseService: TestDatabaseService;
  let testPasswordResetTokenService: TestPasswordResetTokenService;

  beforeAll(async () => {
    const testApp = new TestApp();

    testDatabaseService = new TestDatabaseService();
    testPasswordResetTokenService = new TestPasswordResetTokenService(testDatabaseService);

    app = await testApp.init();
  });

  beforeEach(async () => {
    await testPasswordResetTokenService.deleteAll();
  });

  it('should error if the request body is invalid', async () => {
    return request(app.getHttpServer())
      .patch(URL)
      .send({
        token: 123,
        password: 'inval',
        passwordConfirmation: 'nonmatchingpassword',
      })
      .expect(422)
      .expect({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: {
          token: ['token must be a string'],
          password: ['password must be longer than or equal to 8 characters'],
          passwordConfirmation: ['"passwordConfirmation" does not match "password."'],
        },
      });
  });

  it('should error if the token is invalid', async () => {
    const password = faker.internet.password(12);
    return request(app.getHttpServer())
      .patch(URL)
      .send({
        token: faker.string.uuid(),
        password,
        passwordConfirmation: password,
      })
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should error if the token has expired', async () => {
    const expiredToken = await testPasswordResetTokenService.create({ expiresAt: dayjs().subtract(2, 'days').toDate() });
    const password = faker.internet.password(12);
    return request(app.getHttpServer())
      .patch(URL)
      .send({
        token: expiredToken.token,
        password,
        passwordConfirmation: password,
      })
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
  });

  it('should return an empty successful response when the password is updated', async () => {
    const resetToken = await testPasswordResetTokenService.create();
    const password = faker.internet.password(12);
    return request(app.getHttpServer())
      .patch(URL)
      .send({
        token: resetToken.token,
        password,
        passwordConfirmation: password,
      })
      .expect(200)
      .expect({
        statusCode: 200,
        message: 'success',
      });
  });

  it('should delete the reset request on successful reset', async () => {
    const resetToken = await testPasswordResetTokenService.create();
    const password = faker.internet.password(12);
    const response = await request(app.getHttpServer())
      .patch(URL)
      .send({
        token: resetToken.token,
        password,
        passwordConfirmation: password,
      });

    expect(response.statusCode).toEqual(200);

    const refetchDbToken = await testPasswordResetTokenService.findByToken(resetToken.token);
    expect(refetchDbToken).toBeNull();
  });
});
