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
  @IsOptional()
  readonly sellDate = new Date();

  @IsNotEmpty()
  @IsNumber()
  readonly clientId!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly productId!: number;
}
