import { Entity, ManyToMany, Collection } from '@mikro-orm/core';
import { Event } from '../event/event.entity';
import { Thing } from '../thing/thing.entity';

@Entity()
export class Items extends Thing {
  // Items belongs to Event collection : 1,n items(s) is used(s) in 1,n event(s)
  @ManyToMany(() => Event, (event) => event.item)
  event = new Collection<Event>(this);
}
