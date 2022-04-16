import { Property, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { ThingType } from '../thingType/thingType.entity';

export abstract class Thing {
  @PrimaryKey()
  thingId!: number;

  @Property()
  name!: string;

  @Property()
  stock!: number;

  @ManyToOne()
  thingType: ThingType;
}
