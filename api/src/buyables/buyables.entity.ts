import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Users } from '../users/user.entity';
import { Event } from '../event/event.entity';

@Entity()
export class Buyables {
  @PrimaryKey()
  goodiesId: number;

  @Property({ type: 'text', length: 50 })
  Title!: string;

  @Property()
  Stock!: number;

  @Property()
  Type!: number;

  // Items belongs to Users collection : 1,n items(s) is bought(s) by 1,n user(s)
  @ManyToMany(() => Users, (user) => user.item)
  user = new Collection<Users>(this);

  // Items belongs to Event collection : 1,n items(s) is used(s) in 1,n event(s)
  @ManyToMany(() => Event, (event) => event.item)
  event = new Collection<Event>(this);
}
