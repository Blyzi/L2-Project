import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Event {
  @PrimaryKey()
  eventId: number;

  @Property({ type: 'text', length: 50 })
  text2!: string;

  @Property({ type: 'text', length: 50 })
  permissions!: number;
}
