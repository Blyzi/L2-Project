import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';

import { Goodies } from '../goodies/goodies.entity';

@Entity()
export class Client {
  @ManyToMany(() => Goodies, (goodies) => goodies)
  goodies = new Collection<Goodies>(this);
}
