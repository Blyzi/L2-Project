import { IsString, IsNotEmpty, MaxLength, IsEnum } from 'class-validator';

// Custom Packages
import { Permissions } from '../class/permissions';
import { IsPermissions } from '../decorator/validator';
import { COLORS } from '../../shared/enum/Colors';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @IsPermissions()
  readonly permissions?: Permissions;

  @IsString()
  @IsEnum(COLORS)
  readonly color = COLORS[8]; //teal is default value
}
