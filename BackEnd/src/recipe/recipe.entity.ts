import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Instruction } from '../instruction/instruction.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { User } from 'src/users/user.entity';
@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  name: string;

  @Column({default: ''})
  estimatedPreparationTime: string;

  @ManyToOne((type) => User, (user) => user.recipes)
  user: User;

  @Column({default: ''})
  image: string;

  @OneToMany((type) => Instruction, (instruction) => instruction.recipe)
  instructions: Instruction[];

  @OneToMany((type) => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];
}
