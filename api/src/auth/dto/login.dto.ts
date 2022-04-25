import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  readonly mail: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
