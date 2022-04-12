import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Goodies {
  @PrimaryKey()
  goodiesId!: number;

  @Property()
  title!: string;
}
