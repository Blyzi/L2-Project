import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

// Custom Packages
import { CreateTeamDto } from './dto';
import { UpdateTeamDto } from './dto';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: EntityRepository<Team>,
  ) {}

  public async createTeam(dto: CreateTeamDto): Promise<Team> {
    const team = new Team(dto);
    await this.teamRepository.persistAndFlush(team);
    return team;
  }

  public async findAll(): Promise<Team[]> {
    return this.teamRepository.findAll();
  }

  public async findOne(teamId: number): Promise<Team> {
    return await this.teamRepository.findOneOrFail({
      teamId,
    });
  }

  public async update(teamId: number, dto: UpdateTeamDto): Promise<Team> {
    const team = await this.teamRepository.findOneOrFail({
      teamId,
    });
    wrap(team).assign(dto);
    await this.teamRepository.flush();
    return team;
  }

  public async delete(teamId: number): Promise<void> {
    await this.teamRepository.removeAndFlush(
      await this.teamRepository.findOneOrFail({
        teamId,
      }),
    );
  }
}
