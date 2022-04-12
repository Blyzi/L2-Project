import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { Event } from '../event/event.entity';
import { Items } from '../items/items.entity';

@Entity() // even though it's a relation, we need to define it as an entity to create the amount attribute
export class Use {
  @ManyToOne({ primary: true })
  event!: Event;

  @ManyToOne({ primary: true })
  item!: Items;

  @Property()
  amount!: number;

  [PrimaryKeyType]?: [number, number]; // this is needed for proper type checks in `FilterQuery`

  constructor(event: Event, item: Items, amount: number) {
    this.event = event;
    this.item = item;
    this.amount = amount; //TODO: appeler le constructeur ailleurs
  }
}
