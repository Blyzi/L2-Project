import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { Client } from '../client/client.entity';
import { Goodies } from '../goodies/goodies.entity';

@Entity()
export class Buy {
  //@ManyToOne({ primary: true })
  //client!: Client;

  @ManyToOne({ primary: true })
  goodie!: Goodies;

  @Property()
  amount: number;

  @Property()
  sellPrice!: number;

  @Property()
  sellDate!: Date;

  [PrimaryKeyType]?: [number, number]; // this is needed for proper type checks in `FilterQuery`

  constructor(
    //client: Client,
    goodie: Goodies,
    amount: number,
    price: number,
    sellDate: Date,
  ) {
    //this.client = client;
    this.goodie = goodie;
    this.amount = amount;
    this.sellPrice = price; // price at which the goodie has been sold //TODO:Remplacer par current price
    this.sellDate = sellDate; //TODO: Remplacer par current Datetime (cherche dans Postgre)
  }
}
