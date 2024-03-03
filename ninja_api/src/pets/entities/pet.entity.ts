import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// we need to add declarations to use this entity class as a grapghql class type as well as a ORM entity model class

@Entity()
@ObjectType()
export class Pet{
    
    @PrimaryGeneratedColumn()
    @Field(type=> Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({nullable : true})
    @Field({nullable : true})
    type?: string;

}