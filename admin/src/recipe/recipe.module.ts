import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { Instruction } from '../instruction/instruction.entity';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient, Instruction])],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
