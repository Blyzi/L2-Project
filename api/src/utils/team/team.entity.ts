import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Team {
  @PrimaryKey()
  teamId: number;

  @Property()
  number!: number;

  @Property()
  type!: number;
}
