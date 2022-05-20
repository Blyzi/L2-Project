import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';

export class UpdatePeopleDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  readonly mail?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  readonly firstname?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  readonly lastname?: string;

  @IsDate()
  @IsOptional()
  readonly birthDate?: Date;

  @IsPhoneNumber()
  @IsOptional()
  readonly phoneNumber?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly description?: string;
}
