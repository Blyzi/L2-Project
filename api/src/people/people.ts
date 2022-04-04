import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  OneToMany,
  OneToOne,
  Collection,
} from '@mikro-orm/core';

export abstract class Person {
  @Property()
  name!: string;

  @Property()
  surname!: string;

  @Property()
  mail!: string;

  @Property()
  birth_date!: Date;

  @Property({ type: 'int' })
  phone_number!: number;

  @Property()
  creation_date!: Date;

  @Property()
  description!: string; // to describe the person's skills

  //@OneToOne()
  //toothbrush!: Toothbrush; exemple de relation
}
