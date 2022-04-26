import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  permissions!: number; //TODO:mettre des contraintes aux permissions
}
