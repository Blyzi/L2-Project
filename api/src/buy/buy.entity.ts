import { Entity, ManyToOne, Property, types } from '@mikro-orm/core';

//Custom Packages
import { Product } from '../product/product.entity';
import { Client } from '../client/client.entity';
import { CreateBuyDto } from './dto';

@Entity()
export class Buy {
  @ManyToOne({ primary: true })
  product!: Product;

  @ManyToOne({ primary: true })
  client!: Client;

  @Property({ default: 1 })
  amount!: number;

  @Property({ default: null, type: types.float })
  sellPrice!: number;

  @Property({ default: null })
  sellDate!: Date;

  constructor(dto: CreateBuyDto, client: Client, product: Product) {
    this.client = client;
    this.product = product;
    this.amount = dto.amount;
    this.sellPrice = product.price;
    this.sellDate = dto.sellDate;
  }
}
