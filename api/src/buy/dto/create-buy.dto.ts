import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateBuyDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly amount!: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly sellPrice!: number;

  @IsNotEmpty()
  @IsDate()
  readonly sellDate = new Date();

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly clientId?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly productId?: number;
}
