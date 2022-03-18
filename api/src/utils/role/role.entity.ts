import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Users } from '../users/user.entity';

@Entity()
export class Role {
  @PrimaryKey()
  roleId: number;

  @Property({ type: 'text', length: 50 })
  text!: string;

  @Property()
  permissions!: number;

  // Role belongs to user collection : 1,n role(s) belong(s) to 1,n user(s)
  @ManyToMany(() => Users, (user) => user.role)
  user = new Collection<Users>(this);
}
