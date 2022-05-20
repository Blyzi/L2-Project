import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { UpdatePeopleDto } from '../../people/dto';

export class UpdateUserDto extends UpdatePeopleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  readonly password?: string;
}
