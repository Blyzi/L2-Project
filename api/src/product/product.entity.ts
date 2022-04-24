import { Entity, ManyToMany, Collection } from '@mikro-orm/core';
import { Thing } from '../thing/thing.entity';
import { Buy } from '../buy/buy.entity';
import { Client } from '../client/client.entity';

@Entity()
export class Product extends Thing {
  @ManyToMany({ entity: () => Client, pivotEntity: () => Buy })
  clients = new Collection<Client>(this);
}
