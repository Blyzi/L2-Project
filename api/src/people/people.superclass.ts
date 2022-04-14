import { Property } from '@mikro-orm/core';

export abstract class People {
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
