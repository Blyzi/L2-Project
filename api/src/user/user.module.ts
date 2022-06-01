import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

// Custom Packages
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { UserService } from './user.service';
import { config } from '../shared/configs/config';
import { CreateUserDto } from './dto';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User, Role] }), RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}
  public async onModuleInit(): Promise<void> {
    if ((await this.userRepository.count()) === 0) {
      const adminUser = new User({
        firstname: config.get('admin.firstname'),
        lastname: config.get('admin.lastname'),
        mail: config.get('admin.mail'),
        password: config.get('admin.password'),
      } as CreateUserDto);
      await adminUser.setPassword(config.get('admin.password'));
      adminUser.role = await this.roleRepository.findOne({ title: 'Admin' });
      await this.userRepository.persistAndFlush(adminUser);
    }
  }
}
