import { Entity, ManyToMany, ManyToOne, Collection } from '@mikro-orm/core';

// Custom Packages
import { Use } from '../use/use.entity';
import { Event } from '../event/event.entity';
import { Thing } from '../thing/thing.entity';
import { ThingType } from '../thingType/thingType.entity';
import { CreateItemDto } from './dto';

@Entity()
export class Item extends Thing {
  constructor(dto: CreateItemDto) {
    super(dto);
  }
  // Items belongs to Event collection : 1,n items(s) is used(s) in 1,n event(s)
  @ManyToMany({ entity: () => Event, pivotEntity: () => Use })
  events = new Collection<Event>(this);

  @ManyToOne()
  thingType?: ThingType;
}
