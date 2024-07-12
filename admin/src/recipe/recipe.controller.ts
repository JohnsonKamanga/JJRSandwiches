import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { Instruction } from 'src/instruction/instruction.entity';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get('all')
  async findAllRecipes() {
    return await this.recipeService.findAll();
  }

  @Get(':id')
  async findRecipe(@Param('id') id) {
    return await this.recipeService.findOne(id);
  }


  @Get()
  async findRecipeByUser(@Body('user') user) {
    return await this.recipeService.findOneByUser(user);
  }

  @Post()
  async createRecipe(
    @Body('id') id,
    @Body('user') user,
    @Body('name') name: string,
    @Body('estimatedPreparationTime') estimatedPreparationTime : string,
    @Body('ingredients') ingredients: Ingredient[],
    @Body('instructions') instructions: Instruction[],
  ){
    return await this.recipeService.create({
        id:id,
        user:user,
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
