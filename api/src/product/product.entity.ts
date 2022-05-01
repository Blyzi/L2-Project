import {
  Entity,
  ManyToMany,
  ManyToOne,
  Collection,
  Property,
  types,
} from '@mikro-orm/core';

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
    this.price = dto.price;
  }

  @Property({ type: types.double })
  price!: number;

  @ManyToMany({ entity: () => Client, pivotEntity: () => Buy })
  clients = new Collection<Client>(this);

  @ManyToOne()
  thingType?: ThingType;
}
