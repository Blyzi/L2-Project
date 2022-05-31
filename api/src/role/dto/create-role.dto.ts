import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Permissions } from '../class/permissions';
import { IsPermissions } from '../decorator/validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @IsPermissions()
  readonly permissions?: Permissions;
}
