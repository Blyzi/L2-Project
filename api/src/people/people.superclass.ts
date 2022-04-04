import { Property, PrimaryKey } from '@mikro-orm/core';

export abstract class People {
  @PrimaryKey()
  peopleId: number;

  @Property()
  name!: string;

  @Property()
  surname!: string;

  @Property()
  mail!: string;

  @Property()
  birth_date!: Date;

  @Property({ type: 'int' }) // type à décider
  phone_number!: number;

  @Property()
  creation_date!: Date;

  @Property()
  description!: string; // to describe the person's skills
}
