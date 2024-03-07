import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Owner } from "src/owner/entities/owner.entity";

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

    @ManyToOne(() => Owner, owner => owner.pets)
    @Field(type=> Owner, {nullable : true})
    owner?: Owner;

    @Column({nullable : true})
    @Field(type => Int,{nullable : true})
    ownerId : number;
}