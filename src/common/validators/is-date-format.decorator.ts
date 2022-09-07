import {
  registerDecorator,
  ValidationOptions,
  buildMessage,
} from 'class-validator';

export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return /^\d{4}-\d{2}-\d{2}$/.test(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property does not match date format',
          validationOptions,
        ),
      },
    });
  };
}
