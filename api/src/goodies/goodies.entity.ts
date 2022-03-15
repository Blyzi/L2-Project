import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Goodies {
    @PrimaryKey()
    id_goodies!: number;

    @Property()
    title!: string;
}