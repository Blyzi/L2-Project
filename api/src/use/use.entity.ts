import { Entity, ManyToOne, Property } from '@mikro-orm/core';

//Custom Packages
import { Event } from '../event/event.entity';
import { Item } from '../item/item.entity';
import { CreateUseDto } from './dto';

@Entity() // even though it's a relation, we need to define it as an entity to create the amount attribute
export class Use {
  @ManyToOne({ primary: true })
  event!: Event;

  //@ManyToOne({ primary: true })
  //item!: Item;

  @Property({ default: 1 })
  amount!: number;

  constructor(dto: CreateUseDto, event: Event /*, item: Item*/) {
    this.event = event;
    //this.item = item;
    this.amount = dto.amount;
  }
}
