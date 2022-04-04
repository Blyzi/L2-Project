import { Entity, ManyToMany, Collection } from '@mikro-orm/core';

import { Goodies } from '../goodies/goodies.entity';
import { People } from '../people/people.superclass';
import { Team } from '../team/team.entity';

@Entity()
export class Client extends People {
  // Users collection has Items in it : 1,n user(s) has 1,n role(s)
  @ManyToMany(() => Goodies)
  goodies = new Collection<Goodies>(this);

  // Client belongs to Event collection : 1,n client(s) participate(s) to 1,n event(s)
  @ManyToMany(() => Event, (event) => event.client)
  event = new Collection<Event>(this);
}
