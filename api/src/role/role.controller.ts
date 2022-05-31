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

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('')
  create(@Body() role: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(role);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) roleId: number): Promise<Role> {
    return this.roleService.findOne(roleId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) roleId: number,
    @Body() role: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(roleId, role);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) roleId: number): Promise<void> {
    return this.roleService.delete(roleId);
  }
}
