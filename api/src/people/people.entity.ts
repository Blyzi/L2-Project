import { PrimaryKey, Property } from '@mikro-orm/core';
import * as dayjs from 'dayjs';
// Custom Packages
import { CreatePeopleDto } from './dto';
export abstract class People {
  @PrimaryKey()
  peopleId!: number;

  @Property()
  firstname!: string;

  @Property()
  lastname!: string;

  @Property()
  mail!: string;

  @Property({
    serializer: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
  })
  birthDate?: Date;

  @Property()
  phoneNumber?: string;

  @Property()
  creationDate: Date;

  @Property({ type: 'text' })
  description?: string; // to describe the person's skills

  constructor(dto: CreatePeopleDto) {
    this.firstname = dto.firstname;
    this.lastname = dto.lastname;
    this.mail = dto.mail;
    this.birthDate = dto.birthDate;
    this.phoneNumber = dto.phoneNumber;
    this.description = dto.description;
    this.creationDate = new Date();
  }
}
