import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Use } from '../use/use.entity';
import { User } from '../user/user.entity';
import { Item } from '../item/item.entity';
import { Client } from '../client/client.entity';
import { CreateEventDto } from './dto';
import * as dayjs from 'dayjs';
@Entity()
export class Event {
  constructor(dto: CreateEventDto) {
    this.title = dto.title;
    this.description = dto.description;
    this.start = dto.start;
    this.end = dto.end;
    this.color = dto.color;
  }

  @PrimaryKey()
  eventId!: number;

  @Property()
  title!: string;

  @Property()
  description?: string;

  @Property({
    serializer: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
  })
  start!: Date;

  @Property({
    serializer: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
  })
  end!: Date;

  @Property()
  color!: string;

  // Event collection has Users in it : 1,n event(s) has 1,n user(s) which participates in it
  @ManyToMany(() => User, (user) => user.events, { owner: true })
  users = new Collection<User>(this);

  // Event collection has Client in it : 1,n event(s) has 1,n user(s) which participates in it
  @ManyToMany(() => Client, (client) => client.events, { owner: true })
  clients = new Collection<Client>(this);

  // Event collection has Items in it : 1,n event(s) use(s) 1,n item(s)
  @ManyToMany({ entity: () => Item, pivotEntity: () => Use })
  items = new Collection<Item>(this);
}
