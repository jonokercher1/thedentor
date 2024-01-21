import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from 'class-validator';

@ValidatorConstraint({ name: 'string-or-number', async: false })
@Injectable()
export class IsNumberOrStringConstraint implements ValidatorConstraintInterface {
  validate(text: any) {
    return typeof text === 'number' || typeof text === 'string';
  }

  defaultMessage() {
    return '($value) must be number or string';
  }
}

export function IsNumberOrString(property?: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsNumberOrString',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsNumberOrStringConstraint,
    });
  };
}