import { Entity, ManyToMany, Collection } from '@mikro-orm/core';
import { Event } from '../event/event.entity';
import { Thing } from '../thing/thing.entity';

@Entity()
export class Item extends Thing {
  // Items belongs to Event collection : 1,n items(s) is used(s) in 1,n event(s)
  @ManyToMany(() => Event)
  events = new Collection<Event>(this);
}
