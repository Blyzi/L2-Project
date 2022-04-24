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

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @IsDate()
  readonly dateStart!: Date;
  @IsDate()
  readonly dateEnd!: Date;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  readonly description?: string;

  @IsString()
  @IsEnum(colorEnum)
  readonly color = colorEnum[8]; //teal is default value
}
