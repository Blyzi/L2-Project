import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { Client } from 'src/client/client.entity';
import { Goodies } from 'src/goodies/goodies.entity';

@Entity()
export class Buy {
  @ManyToOne({ primary: true })
  client: Client;

  @ManyToOne({ primary: true })
  goodie: Goodies;

  @Property()
  amount = 1;

  @Property()
  sell_price: number;

  @Property()
  sell_date: Date;

  [PrimaryKeyType]?: [number, number]; // this is needed for proper type checks in `FilterQuery`

  constructor(
    client: Client,
    goodie: Goodies,
    amount = 1,
    price,
    sell_date
  ) {
    this.client = client;
    this.goodie = goodie;
    this.sell_price = price; // price at which the goodie has been sold //TODO:Remplacer par current price
    this.sell_date = '02 / 09 / 2022', //TODO: Remplacer par current Datetime (cherche dans Postgre)
  }
}
