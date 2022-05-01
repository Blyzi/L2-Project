import { IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateUseDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  readonly amount?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly eventId?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly itemId?: number;
}
