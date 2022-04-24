import { Entity, Property, ManyToMany, Collection } from '@mikro-orm/core';
import { Role } from '../role/role.entity';
import { Team } from '../team/team.entity';
import { Event } from '../event/event.entity';
import { People } from '../people/people.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';

@Entity()
export class User extends People {
  constructor(dto: CreateUserDto) {
    super(dto);
  }

  @Property({ type: 'text', hidden: true })
  password?: string;

  // Users collection has Role in it : 1,n user(s) has 1,n role(s)
  @ManyToMany(() => Role, (role) => role.users, { owner: true })
  roles = new Collection<Role>(this);

  // Users belongs to Team collection : 1,n user(s) belong(s) to 1,n team(s)
  @ManyToMany(() => Team, (team) => team.user)
  teams = new Collection<Team>(this);

  // Users belongs to Event collection : 1,n user(s) participate(s) to 1,n event(s)
  @ManyToMany(() => Event, (event) => event.users)
  events = new Collection<Event>(this);

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }
}
