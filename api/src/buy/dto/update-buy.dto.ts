import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class UpdateBuyDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  readonly amount?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  readonly sellPrice?: number;

  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  readonly sellDate?: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly clientId?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly productId?: number;
}
