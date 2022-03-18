import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Role } from '../role/role.entity';

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

  // User collection has role in it : 1,n user(s) has 1,n role(s)
  @ManyToMany(() => Role)
  role = new Collection<Role>(this);
}
