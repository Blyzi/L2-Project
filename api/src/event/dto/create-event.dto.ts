import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDate,
  IsOptional,
  IsEnum,
  ValidateIf,
  IsArray,
  IsNumber,
} from 'class-validator';
import { IsObjectOfPositiveInt } from 'src/shared/validators/IsObjectOfPositiveInt';
import { COLORS } from '../../shared/enum/Colors';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @IsDate()
  readonly start!: Date;

  @IsDate()
  @ValidateIf((o) => o.end > o.start)
  readonly end!: Date;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  readonly description?: string;

  @IsString()
  @IsEnum(COLORS)
  readonly color = COLORS[8]; //teal is default value

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  readonly usersId: number[];

  @IsOptional()
  @IsObjectOfPositiveInt({
    message: 'Invalid items',
  })
  readonly items?: { [key: number]: number };

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  readonly clientsId: number[];
}
