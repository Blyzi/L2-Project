import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Users } from '../users/user.entity';
import { Event } from '../event/event.entity';
import { Items_type } from '../items_type/items_type.entity';

@Entity()
export class Items {
  @PrimaryKey()
  stockId: number;

  @Property({ type: 'text', length: 50 })
  Title!: string;

  @Property()
  Stock!: number;

  // Items belongs to Users collection : 1,n items(s) is bought(s) by 1,n user(s)
  @ManyToMany(() => Users, (user) => user.item)
  user = new Collection<Users>(this);

  // Items belongs to Event collection : 1,n items(s) is used(s) in 1,n event(s)
  @ManyToMany(() => Event, (event) => event.item)
  event = new Collection<Event>(this);

  @OneToMany(() => Items_type, (items_type) => items_type.item)
  item_type = new Collection<Items_type>(this);
}
