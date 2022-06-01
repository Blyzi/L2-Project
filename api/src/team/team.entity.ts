import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';

// Custom Packages
import { User } from '../user/user.entity';
import { Client } from '../client/client.entity';
import { CreateTeamDto } from './dto';

@Entity()
export class Team {
  constructor(dto: CreateTeamDto) {
    this.name = dto.name;
  }

  @PrimaryKey()
  teamId!: number;

  @Property()
  name!: string;

  // Team collection has Users in it : 1,n team(s) has 1,n user(s)
  @ManyToMany(() => User, (user) => user.teams, { owner: true })
  user = new Collection<User>(this);

  // Team collection has Clients in it : 1,n team(s) has 1,n client(s)
  @ManyToMany(() => Client, (client) => client.teams, { owner: true })
  client = new Collection<Client>(this);
}
