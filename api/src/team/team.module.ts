import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { Team } from './team.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Team] })],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
