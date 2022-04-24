import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { User } from '../user/user.entity';
import { Client } from '../client/client.entity';

@Entity()
export class Team {
  @PrimaryKey()
  teamId!: number;

  @Property()
  number!: number;

  @Property()
  type!: number;

  // Team collection has Users in it : 1,n team(s) has 1,n user(s)
  @ManyToMany(() => User, (user) => user.teams, { owner: true })
  user = new Collection<User>(this);

  // Team collection has Clients in it : 1,n team(s) has 1,n client(s)
  @ManyToMany(() => Client, (client) => client.teams, { owner: true })
  client = new Collection<Client>(this);
}
