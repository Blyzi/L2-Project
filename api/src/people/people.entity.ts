import { PrimaryKey, Property, DateType } from '@mikro-orm/core';

export abstract class People {
  @PrimaryKey()
  idPeople!: number;

  @Property()
  name!: string;

  @Property()
  surname!: string;

  @Property()
  mail!: string;

  @Property({ type: DateType })
  birthDate: Date;

  @Property()
  phoneNumber: string;

  @Property()
  creationDate!: number;

  @Property({ type: 'text' })
  description: string; // to describe the person's skills

  constructor(
    name: string,
    surname: string,
    mail: string,
    birthDate: Date,
    phoneNumber: string,
    description: string,
  ) {
    this.name = name;
    this.surname = surname;
    this.mail = mail;
    this.birthDate = birthDate;
    this.phoneNumber = phoneNumber;
    this.creationDate = Date.now();
    this.description = description;
  }
}
