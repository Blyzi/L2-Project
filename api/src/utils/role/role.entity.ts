import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Role {
  @PrimaryKey()
  roleId: number;

  @Property({ type: 'text', length: 50 })
  text!: string;

  @Property()
  permissions!: number;
}
