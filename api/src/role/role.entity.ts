import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Role {
    @PrimaryKey()
    id_event!: number;

    @Property()
    text!: string;

    @Property()
    permissions!: string;
}