import { 
    IsEmail, 
    IsString, 
    Validate, 
    ValidatorConstraint, 
    ValidatorConstraintInterface, 
    ValidationArguments 
  } from 'class-validator';
  import { 
    IsLongEnough, 
    HasUpperCase, 
    HasLowerCase, 
    HasNumber, 
    HasSymbol 
  } from '../../auth/decorators/password.decorator';
  
  @ValidatorConstraint({ name: 'PasswordsMatch', async: false })
  export class PasswordsMatch implements ValidatorConstraintInterface {
    validate(password1: string, args: ValidationArguments) {
      const [relatedPropertyName] = args.constraints;
      const relatedValue = (args.object as any)[relatedPropertyName];
      return password1 === relatedValue;
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Passwords do not match';
    }
  }
  
  export class CreateUserDto {
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;
  
    @IsString({ message: 'First name must be a string' })
    firstname: string;
  
    @IsString({ message: 'Last name must be a string' })
    lastname: string;
  
    @IsString({ message: 'Password must be a string' })
    @IsLongEnough()
    @HasUpperCase()
    @HasLowerCase()
    @HasNumber()
    @HasSymbol()
    password1: string;
  
    @IsString({ message: 'Confirm password must be a string' })
    @Validate(PasswordsMatch, ['password1'], { message: 'Passwords do not match' })
    password2: string;
  }
  