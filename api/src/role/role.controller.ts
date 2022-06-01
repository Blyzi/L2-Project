import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';

//Custom Packages
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto';
import { UpdateRoleDto } from './dto';
import { Role } from './role.entity';
import { Auth } from 'src/auth/auth.decorator';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Auth()
  @Post('')
  create(@Body() role: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(role);
  }

  @Auth()
  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) roleId: number): Promise<Role> {
    return this.roleService.findOne(roleId);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) roleId: number,
    @Body() role: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(roleId, role);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) roleId: number): Promise<void> {
    return this.roleService.delete(roleId);
  }
}
