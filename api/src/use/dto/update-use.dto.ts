import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateUseDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly itemId?: number;
}
