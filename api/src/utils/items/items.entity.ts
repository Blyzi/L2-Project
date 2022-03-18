import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Items {
  @PrimaryKey()
  stockId: number;

  @Property({ type: 'text', length: 50 })
  Title!: string;

  @Property()
  Stock!: number;
}
