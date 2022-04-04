import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Role } from '../role/role.entity';
import { Team } from '../team/team.entity';
import { Event } from '../event/event.entity';
import { Items } from '../items/items.entity';
import { People } from '../people/people.superclass';

@Entity()
export class Users extends People {
  @PrimaryKey()
  userId: number;

  @Property({ type: 'text' })
  password!: string;

  // Users collection has Role in it : 1,n user(s) has 1,n role(s)
  @ManyToMany(() => Role)
  role = new Collection<Role>(this);

  // Users belongs to Team collection : 1,n user(s) belong(s) to 1,n team(s)
  @ManyToMany(() => Team, (team) => team.user)
  team = new Collection<Team>(this);

  // Users belongs to Event collection : 1,n user(s) participate(s) to 1,n event(s)
  @ManyToMany(() => Event, (event) => event.user)
  event = new Collection<Event>(this);

  // Users collection has Items in it : 1,n user(s) has 1,n role(s)
  @ManyToMany(() => Items)
  item = new Collection<Items>(this);
}
