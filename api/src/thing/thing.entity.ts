import { Property, PrimaryKey } from '@mikro-orm/core';

// Custom Packages
import { CreateThingDto } from './dto';

export abstract class Thing {
  @PrimaryKey()
  thingId!: number;

  @Property()
  name!: string;

  @Property()
  stock!: number;

  constructor(dto: CreateThingDto) {
    this.name = dto.name;
    this.stock = dto.stock;
  }
}
