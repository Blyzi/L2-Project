import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

// Custom Packages
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { Team } from './team.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Team] }), AuthModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
