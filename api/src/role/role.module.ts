import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

// Custom Packages
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Role] })],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
  ) {}
  public async onModuleInit(): Promise<void> {
    console.log('Role is initialized');
    const counter = await this.roleRepository.count();
    if (counter === 0) {
      const adminRole = new Role({
        title: 'Admin',
        color: 'red',
        permissions: {
          buy: [0],
          client: [0],
          event: [0],
          item: [0],
          product: [0],
          role: [0],
          team: [0],
          thingtype: [0],
          use: [0],
          user: [0],
        },
      } as CreateRoleDto);
      await this.roleRepository.persistAndFlush(adminRole);

      const defaultRole = new Role({
        title: 'Default',
        color: 'grey',
        permissions: {
          buy: [2],
          client: [2],
          event: [2],
          item: [2],
          product: [2],
          role: [2],
          team: [2],
          thingtype: [2],
          use: [2],
          user: [2],
        },
      } as CreateRoleDto);
      await this.roleRepository.persistAndFlush(defaultRole);
    }
  }
}
