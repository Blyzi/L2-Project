import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateThingDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly stock?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  readonly name?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly thingTypeId?: number;
}
