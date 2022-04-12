import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Items } from '../items/items.entity';

@Entity()
export class ItemsType {
  @PrimaryKey()
  itemsTypeId: number;

  @Property({ type: 'text', length: 50 })
  title!: string;

  @Property({ type: 'text', length: 50 })
  rent!: boolean;

  @ManyToOne()
  item!: Items;
}
