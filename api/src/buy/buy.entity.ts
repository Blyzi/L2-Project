import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

//Custom Packages
import { Product } from '../product/product.entity';
import { Client } from '../client/client.entity';
import { CreateBuyDto } from './dto';

@Entity()
export class Buy {
  @PrimaryKey()
  buyId!: number;

  @ManyToOne({ primary: true })
  product!: Product;

  @ManyToOne({ primary: true })
  client!: Client;

  @Property({ default: 1 })
  amount!: number;

  @Property()
  sellPrice!: number;

  @Property()
  sellDate!: Date;

  constructor(dto: CreateBuyDto, client: Client, product: Product) {
    this.client = client;
    this.product = product;
    this.amount = dto.amount;
    this.sellPrice = dto.sellPrice;
    this.sellDate = dto.sellDate;
  }
}
