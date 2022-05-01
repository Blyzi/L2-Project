import { Entity, ManyToMany, ManyToOne, Collection } from '@mikro-orm/core';

//Custom Packages
import { Thing } from '../thing/thing.entity';
import { Buy } from '../buy/buy.entity';
import { Client } from '../client/client.entity';
import { ThingType } from '../thingType/thingType.entity';
import { CreateProductDto } from './dto';

@Entity()
export class Product extends Thing {
  constructor(dto: CreateProductDto) {
    super(dto);
  }

  @ManyToMany({ entity: () => Client, pivotEntity: () => Buy })
  clients = new Collection<Client>(this);

  @ManyToOne()
  thingType?: ThingType;
}
