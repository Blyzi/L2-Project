import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Items_type {
  @PrimaryKey()
  items_typeid: number;

  @Property({ type: 'text', length: 50 })
  title!: string;

  @Property({ type: 'text', length: 50 })
  rent!: boolean;
}
