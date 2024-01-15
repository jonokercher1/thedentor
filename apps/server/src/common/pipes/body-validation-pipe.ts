import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

export class BodyValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException({
          statusCode: 422,
          message: 'Unprocessable Entity',
          error: errors.reduce(
            (acc, e) => {
              if (e.children) {
                return {
                  ...acc,
                  [e.property]: e.children.reduce((acc, cur) => ({
                    ...acc,
                    [cur.property]: Object.values(cur.constraints),
                  }), {}),
                };
              }

              return {
                ...acc,
                [e.property]: Object.values(e.constraints),
              };
            },
            {},
          ),
        });
      },
    });
  }
}