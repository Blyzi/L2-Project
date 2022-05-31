import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateUseDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly amount!: number;
}
