import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

//Custom Packages
import { CreateThingDto } from '../../thing/dto';

export class CreateProductDto extends CreateThingDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price!: number;
}
