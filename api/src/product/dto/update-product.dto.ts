import { IsNumber, IsNotEmpty, IsPositive, IsOptional } from 'class-validator';
import { UpdateThingDto } from '../../thing/dto';

export class UpdateProductDto extends UpdateThingDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  price?: number;
}
