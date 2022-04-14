import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Users } from '../users/user.entity';
import { Items } from '../items/items.entity';
import { Client } from '../client/client.entity';

@Entity()
export class Event {
  @PrimaryKey()
  eventId!: number;

  @Property()
  title!: string;
  @Property()
  description!: string;

  @Property()
  dateStart!: Date;

  @Property()
  dateEnd!: Date;

  @Property()
  color!: string; //TODO:Enum à faire + tard

  // Event collection has Users in it : 1,n event(s) has 1,n user(s) which participates in it
  @ManyToMany(() => Users)
  user = new Collection<Users>(this);

  // Event collection has Client in it : 1,n event(s) has 1,n user(s) which participates in it
  @ManyToMany(() => Client)
  client = new Collection<Client>(this);

  // Event collection has Items in it : 1,n event(s) use(s) 1,n item(s)
  @ManyToMany(() => Items)
  item = new Collection<Items>(this);
}
