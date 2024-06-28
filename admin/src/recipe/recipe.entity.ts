import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Instruction } from '../instruction/instruction.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  name: string;

  @Column({default: ''})
  estimatedPreparationTime: string;

  @OneToMany((type) => Instruction, (instruction) => instruction.recipe)
  instructions: Instruction[];

  @OneToMany((type) => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];
}
