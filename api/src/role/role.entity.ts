import { Entity, PrimaryKey, Property, ManyToMany } from '@mikro-orm/core';
import { Users } from '../users/user.entity';

@Entity()
export class Role {
  @PrimaryKey()
  roleId: number;

  @Property({ type: 'text', length: 50 })
  title!: string;

  @Property()
  permissions!: number;

  // Role belongs to Users collection : 1,n role(s) belong(s) to 1,n user(s)
  @ManyToMany(() => Users, (users) => users.role)
  user: Users;
}
