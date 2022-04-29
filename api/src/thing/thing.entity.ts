import { Property, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { ThingType } from '../thingType/thingType.entity';
import { CreateThingDto } from './dto';

export abstract class Thing {
  @PrimaryKey()
  thingId!: number;

  @Property()
  name!: string;

  @Property()
  stock!: number;

  @ManyToOne()
  thingType?: ThingType;

  constructor(dto: CreateThingDto, thingType?: ThingType) {
    this.name = dto.name;
    this.stock = dto.stock;
    if (thingType != undefined) {
      this.thingType = thingType;
    }
  }
}
