import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsLongEnough(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.length >= 8;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must be at least 8 characters long';
        },
      },
    });
  };
}

export function HasUpperCase(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && /[A-Z]/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must contain at least one uppercase letter';
        },
      },
    });
  };
}

export function HasLowerCase(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && /[a-z]/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must contain at least one lowercase letter';
        },
      },
    });
  };
}

export function HasNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && /[0-9]/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must contain at least one number';
        },
      },
    });
  };
}

export function HasSymbol(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && /[!@#$%^&*(),.?":{}|<>]/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must contain at least one special character';
        },
      },
    });
  };
}