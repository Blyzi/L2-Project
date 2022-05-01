import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateThingDto {
  @IsNumber()
  @IsNotEmpty()
  readonly stock!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name!: string;

  @IsNumber()
  @IsOptional()
  readonly thingTypeId?: number;
}
