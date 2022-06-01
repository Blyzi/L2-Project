import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { NotAcceptableException } from '@nestjs/common';

// Custom Packages
import { ACTIONS } from '../../shared/enum/Actions';
import { Permissions } from '../class/permissions';

export function IsPermissions(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsPermissions',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          let verif = true;
          if (!(value instanceof Permissions)) {
            verif = false;
            throw new NotAcceptableException('Not a Permissions object');
            return false;
          }
          Object.values(value).forEach((actionsArray) => {
            if (!(actionsArray.constructor === Array)) {
              verif = false;
              throw new NotAcceptableException(
                'One permission is not an array',
              );
              return false;
            }
            Object.values(actionsArray).forEach((action) => {
              if (
                Object.values(ACTIONS).find(
                  (actionVerif) => actionVerif === action,
                ) === undefined
              ) {
                verif = false;
                throw new NotAcceptableException(
                  "One permission doesn't exist",
                );
                return false;
              }
            });
          });
          if (verif) {
            return true;
          }
        },
      },
    });
  };
}
