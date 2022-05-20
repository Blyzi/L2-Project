import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEnum,
  IsOptional,
} from 'class-validator';

enum iconEnum {
  'logo1',
  'logo2',
  'logo3',
  'logo4',
  'logo5',
}

export class UpdateThingTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsEnum(iconEnum)
  @IsOptional()
  readonly icon? = iconEnum[0]; //Logo 1 is default value
}
