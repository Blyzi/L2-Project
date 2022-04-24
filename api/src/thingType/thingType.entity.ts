import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Thing } from '../thing/thing.entity';

@Entity()
export class ThingType {
  @PrimaryKey()
  thingTypeId: number;

  @Property({ type: 'text', length: 50 })
  title!: string;

  @Property()
  icon!: string;
  //TODO: Enum of icons

  @OneToMany(() => Thing, (thing) => thing.thingType)
  things = new Collection<Thing>(this);
}
