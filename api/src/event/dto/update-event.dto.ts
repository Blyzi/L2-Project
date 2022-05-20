import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDate,
  IsOptional,
  IsEnum,
} from 'class-validator';

enum colorEnum {
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'blue',
  'teal',
  'cyan',
  'sky',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
}

export class UpdateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  readonly title?: string;

  @IsDate()
  @IsOptional()
  readonly dateStart?: Date;

  @IsDate()
  @IsOptional()
  readonly dateEnd?: Date;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  readonly description?: string;

  @IsString()
  @IsEnum(colorEnum)
  @IsOptional()
  readonly color? = colorEnum[8]; //teal is default value
}
