import { Entity, PrimaryKey, Property, ManyToMany } from '@mikro-orm/core';
import { User } from '../user/user.entity';

@Entity()
export class Role {
  @PrimaryKey()
  roleId: number;

  @Property({ type: 'text', length: 50 })
  title!: string;

  @Property()
  permissions!: number;

  // Role belongs to Users collection : 1,n role(s) belong(s) to 1,n user(s)
  @ManyToMany(() => User, (user) => user.roles)
  users: User;
}
