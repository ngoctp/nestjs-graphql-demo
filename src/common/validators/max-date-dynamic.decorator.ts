import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  maxDate,
  buildMessage,
} from 'class-validator';

export function MaxDateDynamic(
  dateCb: () => Date,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'maxDateDynamic',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [dateCb],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return maxDate(new Date(value), args.constraints[0]());
        },
        defaultMessage: buildMessage(
          (eachPrefix, args?: ValidationArguments) =>
            'maximal allowed date for ' +
            eachPrefix +
            '$property is ' +
            args.constraints[0](),
          validationOptions,
        ),
      },
    });
  };
}
