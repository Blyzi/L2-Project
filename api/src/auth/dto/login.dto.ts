import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  readonly mail: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
