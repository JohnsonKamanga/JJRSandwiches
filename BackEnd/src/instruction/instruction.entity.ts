import { Recipe } from 'src/recipe/recipe.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Instruction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  instruction: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.instructions, {
    onDelete: 'CASCADE'
  })
  recipe: Recipe;
}