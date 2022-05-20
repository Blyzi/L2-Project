import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Product } from '../product/product.entity';
import { Item } from '../item/item.entity';
import { CreateThingTypeDto } from './dto';

@Entity()
export class ThingType {
  constructor(dto: CreateThingTypeDto) {
    this.title = dto.title;
    this.icon = dto.icon;
  }

  @PrimaryKey()
  thingTypeId!: number;

  @Property({ type: 'text', length: 50 })
  title!: string;

  @Property()
  icon!: string;

  @OneToMany(() => Item, (item) => item.thingType)
  items = new Collection<Item>(this);

  @OneToMany(() => Product, (product) => product.thingType)
  products = new Collection<Product>(this);
}
