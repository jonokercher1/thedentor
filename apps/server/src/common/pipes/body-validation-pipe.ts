import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

export class BodyValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException({
          statusCode: 422,
          message: 'Unprocessable Entity',
          error: errors.reduce(
            (acc, e) => ({
              ...acc,
              [e.property]: Object.values(e.constraints),
            }),
            {},
          ),
        });
      },
    });
  }
}