import { Recipe } from 'src/recipe/recipe.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ingredient: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
    onDelete: 'CASCADE'
  })
  recipe: Recipe;
}
