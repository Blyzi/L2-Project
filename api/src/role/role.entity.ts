import { Entity, PrimaryKey, Property, ManyToMany } from '@mikro-orm/core';
import { User } from '../user/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Entity()
export class Role {
  constructor(dto: CreateRoleDto) {
    this.title = dto.title;
    this.permissions = dto.permissions;
  }

  @PrimaryKey()
  roleId!: number;

  @Property({ type: 'text', length: 50 })
  title!: string;

  @Property()
  permissions!: number;

  // Role belongs to Users collection : 1,n role(s) belong(s) to 1,n user(s)
  @ManyToMany(() => User, (user) => user.roles)
  users: User;
}
