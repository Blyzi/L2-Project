import {
  IsString,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Permissions } from '../class/permissions';

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  readonly title?: string;

  @ValidateNested()
  @Type(() => Permissions)
  @IsOptional()
  readonly permissions?: Permissions;
}
