import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

// Custom Packages
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Role] })],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
