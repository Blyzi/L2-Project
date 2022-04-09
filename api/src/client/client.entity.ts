import {
  Entity,
  ManyToMany,
  OneToMany,
  Collection,
  PrimaryKey,
} from '@mikro-orm/core';

import { People } from '../people/people.superclass';
import { Team } from '../team/team.entity';
import { Event } from '../event/event.entity';
import { Buy } from 'src/buy/buy.entity';

@Entity()
export class Client extends People {
  @PrimaryKey()
  id_goodies!: number;

  // Users collection has Goodies in it : 1,n user(s) has 1,n role(s)
  @OneToMany(() => Buy, (product) => product.client)
  products = new Collection<Buy>(this);

  // Client belongs to Event collection : 1,n client(s) participate(s) to 1,n event(s)
  @ManyToMany(() => Event, (event) => event.client)
  event = new Collection<Event>(this);

  // Client belongs to Team collection : 1,n client(s) belong(s) to 1,n team(s)
  @ManyToMany(() => Team, (team) => team.client)
  team = new Collection<Team>(this);
}
