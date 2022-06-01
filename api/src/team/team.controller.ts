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

// Custom Packages
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto';
import { UpdateTeamDto } from './dto';
import { Team } from './team.entity';
import { Auth } from '../auth/auth.decorator';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Auth()
  @Post()
  create(@Body() team: CreateTeamDto): Promise<Team> {
    return this.teamService.createTeam(team);
  }

  @Auth()
  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) teamId: number): Promise<Team> {
    return this.teamService.findOne(teamId);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) teamId: number,
    @Body() team: UpdateTeamDto,
  ): Promise<Team> {
    return this.teamService.update(teamId, team);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) teamId: number): Promise<void> {
    return this.teamService.delete(teamId);
  }
}
