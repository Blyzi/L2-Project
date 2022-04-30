import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Thing } from '../thing/thing.entity';
import { CreateThingTypeDto } from './dto';

@Entity()
export class ThingType {
  constructor(dto: CreateThingTypeDto) {
    this.title = dto.title;
    this.icon = dto.icon;
  }

  @PrimaryKey()
  thingTypeId: number;

  @Property({ type: 'text', length: 50 })
  title!: string;

  @Property()
  icon!: string;

  @OneToMany(() => Thing, (thing) => thing.thingType)
  things = new Collection<Thing>(this);
}
