import { PrimaryKey, Property } from '@mikro-orm/core';
import { CreatePeopleDto } from './dto';
export abstract class People {
  @PrimaryKey()
  peopleId: number;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  mail!: string;

  @Property()
  birthDate?: Date;

  @Property()
  phoneNumber?: string;

  @Property()
  creationDate = new Date();

  @Property({ type: 'text' })
  description?: string; // to describe the person's skills

  constructor(dto: CreatePeopleDto) {
    this.firstName = dto.firstname;
    this.lastName = dto.lastname;
    this.mail = dto.mail;
    this.birthDate = dto.birthDate;
    this.phoneNumber = dto.phoneNumber;
    this.description = dto.description;
    this.creationDate = new Date();
  }
}
