import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Users {
  @PrimaryKey()
  userId: number;

  @Property({ type: 'text', length: 50 })
  firstname!: string;

  @Property({ type: 'text', length: 50 })
  lastname!: string;

  @Property({ type: 'text' })
  password!: string;

  @Property({ type: 'text' })
  email!: string;

  @Property({ type: 'text' })
  phonetel!: string;
}
