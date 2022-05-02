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
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto';
import { UpdateTeamDto } from './dto';
import { Team } from './team.entity';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  create(@Body() team: CreateTeamDto): Promise<Team> {
    return this.teamService.createTeam(team);
  }

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) teamId: number): Promise<Team> {
    return this.teamService.findOne(teamId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) teamId: number,
    @Body() team: UpdateTeamDto,
  ): Promise<Team> {
    return this.teamService.update(teamId, team);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) teamId: number): Promise<void> {
    return this.teamService.delete(teamId);
  }
}
