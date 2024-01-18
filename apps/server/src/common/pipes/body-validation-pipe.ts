import { UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';

export class BodyValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException({
          statusCode: 422,
          message: 'Unprocessable Entity',
          error: errors.reduce((acc, e) => BodyValidationPipe.mapErrors(e, acc as any), {}),
        });
      },
    });
  }

  public static mapErrors(error: ValidationError, errors: any) {
    if (error.children.length) {
      return {
        ...errors,
        [error.property]: error.children.reduce((acc, cur) => {
          console.log('🚀 ~ BodyValidationPipe ~ [error.property]:error.children.reduce ~ cur:', cur.property, cur);
          if (cur.children.length) {
            return cur.children.map((childError) => {
              return BodyValidationPipe.mapErrors(childError, acc);
            });
          }

          return {
            ...acc,
            [cur.property]: Object.values(cur.constraints),
          };
        }, {}),
      };
    }

    return {
      ...errors,
      [error.property]: Object.values(error.constraints),
    };
  }
}


/**
 * we have: error: { answers: { '0': [Object] } }
 * we want: error: { answers: [{  }] }
 * 
 * for singluar errors, we have: error: { email: [ 'email must be an email' ] }
 * we need  to replicate this shape for deeply nested errors
 */