import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Items } from '../items/items.entity';

@Entity()
export class Items_type {
  @PrimaryKey()
  items_typeid: number;

  @Property({ type: 'text', length: 50 })
  title!: string;

  @Property({ type: 'text', length: 50 })
  rent!: boolean;

  @ManyToOne()
  item!: Items;
}
