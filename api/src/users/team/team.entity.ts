import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Users } from '../user.entity';

@Entity()
export class Team {
  @PrimaryKey()
  teamId: number;

  @Property()
  number!: number;

  @Property()
  type!: number;

  // Team collection has Users in it : 1,n team(s) has 1,n user(s)
  @ManyToMany(() => Users)
  user = new Collection<Users>(this);
}
