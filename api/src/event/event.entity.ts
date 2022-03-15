import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Event {
    @PrimaryKey()
    id_event!: number;

    @Property()
    title!: string;

    @Property()
    date_start!: Date;

    @Property()
    date_end!: Date;

    @Property()
    assigned!: string;
}