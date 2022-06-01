import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

//Custom Packages
import { CreateRoleDto } from './dto';
import { UpdateRoleDto } from './dto';
import { Role } from './role.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class RoleService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => AuthGuard))
    private readonly authGuard: AuthGuard,
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
