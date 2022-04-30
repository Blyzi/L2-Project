import { Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { CreateThingDto } from './dto';
import { ThingType } from 'src/thingType/thingType.entity';

export abstract class Thing {
  @PrimaryKey()
  thingId!: number;

  @Property()
  name!: string;

  @Property()
  stock!: number;

  @ManyToOne()
  thingType: ThingType;

  constructor(dto: CreateThingDto) {
    this.name = dto.name;
    this.stock = dto.stock;
  }
}
