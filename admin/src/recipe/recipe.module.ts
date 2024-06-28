import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';
import { IngredientsModule } from 'src/ingredient/ingredient.module';
import { InstructionsModule } from 'src/instruction/instruction.module';

@Module({
  imports: [IngredientsModule, InstructionsModule, TypeOrmModule.forFeature([Recipe])],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
