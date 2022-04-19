import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Event } from '../event/event.entity';
import { Item } from '../item/item.entity';

@Entity() // even though it's a relation, we need to define it as an entity to create the amount attribute
export class Use {
  @ManyToOne({ primary: true })
  event!: Event;

  @ManyToOne({ primary: true })
  item!: Item;

  @Property()
  amount!: number;

  constructor(event: Event, item: Item, amount: number) {
    this.event = event;
    this.item = item;
    this.amount = amount; //TODO: appeler le constructeur ailleurs
  }
}
