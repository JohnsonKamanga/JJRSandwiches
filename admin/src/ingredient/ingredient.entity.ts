import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ingredient{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    ingredient: string;
}