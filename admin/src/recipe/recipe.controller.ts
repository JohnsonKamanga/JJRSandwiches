import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { Instruction } from 'src/instruction/instruction.entity';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  async findAllRecipes() {
    return await this.recipeService.findAll();
  }

  @Get(':id')
  async findRecipe(@Param('id') id) {
    return await this.recipeService.findOne(id);
  }

  @Post()
  async createRecipe(
    @Body('id') id,
    @Body('name') name: string,
    @Body('estimatedPreparationTime') estimatedPreparationTime : string,
    @Body('ingredients') ingredients: Ingredient[],
    @Body('instructions') instructions: Instruction[],
  ){
    return await this.recipeService.create({
        id:id,
        name:name,
        estimatedPreparationTime: estimatedPreparationTime,
        ingredients:ingredients,
        instructions:instructions
    })
  }

  @Delete()
  async deleteRecipe(@Body('id')id){
    return await this.recipeService.delete(id);
  }
}
