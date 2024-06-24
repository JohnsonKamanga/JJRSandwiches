import { Controller, Get } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {

    constructor(private recipeService: RecipeService){

    }

    @Get()
    getRecipe(){
        return this.recipeService.all();
    }
}
