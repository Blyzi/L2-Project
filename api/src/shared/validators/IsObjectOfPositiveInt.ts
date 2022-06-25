import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsObjectOfPositiveInt(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isObjectOfPositiveInt',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'object') {
            return false;
          }
          for (const el in [...value.keys(), ...value.values()]) {
            if (!Number.isInteger(el) || parseInt(el) < 0) {
              return false;
            }
          }
          return true;
        },
      },
    });
  };
}
