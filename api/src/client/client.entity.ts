import { Entity, ManyToMany, Collection } from '@mikro-orm/core';

// Custom Packages
import { People } from '../people/people.entity';
import { Team } from '../team/team.entity';
import { Event } from '../event/event.entity';
import { Buy } from '../buy/buy.entity';
import { Product } from '../product/product.entity';
import { CreateClientDto } from './dto';

@Entity()
export class Client extends People {
  constructor(dto: CreateClientDto) {
    super(dto);
  }

  // Client belongs to Event collection : 1,n client(s) participate(s) to 1,n event(s)
  @ManyToMany(() => Event, (event) => event.clients)
  events = new Collection<Event>(this);

  // Client belongs to Team collection : 1,n client(s) belong(s) to 1,n team(s)
  @ManyToMany(() => Team, (team) => team.client)
  teams = new Collection<Team>(this);

  // Users collection has Goodies in it : 1,n user(s) has 1,n role(s)
  @ManyToMany({ entity: () => Product, pivotEntity: () => Buy })
  products = new Collection<Product>(this);
}
