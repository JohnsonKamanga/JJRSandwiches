import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Instruction } from "../instruction/instruction.entity";
import { Ingredient } from "../ingredient/ingredient.entity";
@Entity()
export class Recipe{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    estimatedPreparationTime: string;

    @OneToMany(type => Instruction, instruction => instruction.instruction )
    instructions: Instruction[];

    @OneToMany(type => Ingredient, ingredient => ingredient.ingredient )
    ingredients: Ingredient[];
}