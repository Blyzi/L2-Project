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

export class CreateThingTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly title!: string;

  @IsString()
  @IsOptional()
  @IsEnum(iconEnum)
  readonly icon = iconEnum[0]; //Logo 1 is default value
}
