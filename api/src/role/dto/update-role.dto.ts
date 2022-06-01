import {
  IsString,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

// Custom Packages
import { Permissions } from '../class/permissions';
import { IsPermissions } from '../decorator/validator';
import { COLORS } from '../../shared/enum/Colors';

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

  @IsString()
  @IsEnum(COLORS)
  @IsPermissions()
  @IsOptional()
  readonly color = COLORS[8]; //teal is default value
}
