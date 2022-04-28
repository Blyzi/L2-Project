import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  readonly title?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  permissions?: number; //TODO:mettre des contraintes aux permissions
}
