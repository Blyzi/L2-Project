import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDate,
  IsOptional,
  IsEnum,
  IsArray,
  IsNumber,
  IsPositive,
} from 'class-validator';

import { COLORS } from '../../shared/enum/Colors';
import { IsObjectOfPositiveInt } from '../../shared/validators/IsObjectOfPositiveInt';

export class UpdateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  readonly title?: string;

  @IsDate()
  @IsOptional()
  readonly start?: Date;

  @IsDate()
  @IsOptional()
  readonly end?: Date;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  readonly description?: string;

  @IsString()
  @IsEnum(COLORS)
  @IsOptional()
  readonly color? = COLORS[8]; //teal is default value

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  readonly usersId: number[];

  @IsOptional()
  @IsObjectOfPositiveInt({
    message: 'Invalid items',
  })
  readonly items?: { [key: string]: number };

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  readonly amount!: number;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  readonly clientsId: number[];
}
