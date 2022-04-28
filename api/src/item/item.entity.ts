import { Entity, ManyToMany, Collection } from '@mikro-orm/core';
import { Event } from '../event/event.entity';
import { ThingType } from '../thingType/thingType.entity';
import { Thing } from '../thing/thing.entity';

@Entity()
export class Item extends Thing {
  constructor(createObject: {
    name: string;
    stock: number;
    thingType?: ThingType;
  }) {
    super(createObject);
  }
  // Items belongs to Event collection : 1,n items(s) is used(s) in 1,n event(s)
  @ManyToMany(() => Event)
  events = new Collection<Event>(this);
}
