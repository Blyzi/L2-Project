import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/core';
import { Collection } from '@mikro-orm/core';

// Custom Packages
import { User } from '../user/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { Permissions } from './class/permissions';

@Entity()
export class Role {
  constructor(dto: CreateRoleDto) {
    console.log(dto.permissions);
    this.title = dto.title;
    this.permissions = dto.permissions;
    this.color = dto.color;
  }

  @PrimaryKey()
  roleId!: number;

  @Property({ type: 'text', length: 50 })
  title!: string;

  @Property()
  permissions!: Permissions;

  @Property()
  color!: string;

  // Role belongs to Users collection : 1 role(s) belong(s) to 1,n user(s)
  @OneToMany(() => User, (user) => user.role)
  users = new Collection<User>(this);
}
