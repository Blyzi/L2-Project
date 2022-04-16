import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Product } from '../product/product.entity';
import { Client } from '../client/client.entity';

@Entity()
export class Buy {
  @ManyToOne({ primary: true })
  product!: Product;

  @ManyToOne({ primary: true })
  client!: Client;

  @Property({ default: 1 })
  amount!: number;

  @Property()
  sellPrice!: number;

  @Property()
  sellDate!: number;

  constructor(
    //client: Client,
    product: Product,
    amount: number,
    price: number,
  ) {
    //this.client = client;
    this.product = product;
    this.amount = amount;
    this.sellPrice = price; // price at which the goodie has been sold //TODO:Remplacer par current price
    this.sellDate = Date.now();
  }
}
