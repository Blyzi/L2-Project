import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  IsDate,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class CreatePeopleDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly lastname: string;

  @IsDate()
  @IsOptional()
  readonly birthDate?: Date;

  @IsPhoneNumber()
  @IsOptional()
  readonly phoneNumber?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
