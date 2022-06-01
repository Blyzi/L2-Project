import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { ConflictException, Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

//Custom Packages
import { CreateRoleDto } from './dto';
import { UpdateRoleDto } from './dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
  ) {}

  public async createRole(dto: CreateRoleDto): Promise<Role> {
    if (await this.roleRepository.findOne({ title: dto.title })) {
      throw new ConflictException('Role already exists');
    }
    const role = new Role(dto);
    await this.roleRepository.persistAndFlush(role);
    return role;
  }

  public async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  public async findOne(roleId: number): Promise<Role> {
    return await this.roleRepository.findOneOrFail({
      roleId,
    });
  }

  public async findByName(name: string): Promise<Role> {
    return await this.roleRepository.findOne({ title: name });
  }

  public async update(roleId: number, dto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOneOrFail({
      roleId,
    });
    wrap(role).assign(dto);
    await this.roleRepository.flush();
    return role;
  }

  public async delete(roleId: number): Promise<void> {
    await this.roleRepository.removeAndFlush(
      await this.roleRepository.findOneOrFail({
        roleId,
      }),
    );
  }
}
