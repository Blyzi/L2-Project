import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Items {
    @PrimaryKey()
    id_stock!: number;

    @Property()
    title!: string;

    @Property()
    item_type!: string;

    @Property()
    stock!: number;
}