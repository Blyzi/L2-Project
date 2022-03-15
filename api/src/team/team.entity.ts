import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Team {
    @PrimaryKey()
    id_event!: number;

    @Property()
    type!: string;

    @Property()
    number!: number;
}