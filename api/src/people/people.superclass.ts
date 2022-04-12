import { Property, PrimaryKey } from '@mikro-orm/core';

export abstract class People {
  @PrimaryKey()
  peopleId!: number;

  @Property()
  name!: string;

  @Property()
  surname!: string;

  @Property()
  mail!: string;

  @Property()
  birthDate: Date;

  @Property()
  phoneNumber: string;

  @Property()
  creationDate!: Date;

  @Property()
  description: string; // to describe the person's skills
}
