import { registerDecorator } from 'class-validator';

export function IsObjectOfPositiveInt() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isObjectOfPositiveInt',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
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
