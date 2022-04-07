import { Property, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { ThingType } from '../thingType/thingType.entity';
import { CreateThingDto } from './dto';

export abstract class Thing {
  constructor(dto: CreateThingDto) {
    this.name = dto.name;
    this.stock = dto.stock;
  }
  @PrimaryKey()
  thingId!: number;

  @Property()
  name!: string;

  @Property()
  stock!: number;

  @ManyToOne()
  thingType: ThingType;
}