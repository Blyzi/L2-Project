import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { CreatePeopleDto } from '../../people/dto';

export class CreateUserDto extends CreatePeopleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
