import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipeService {

    constructor(
        @InjectRepository(Recipe)
        private recipeRepository: Repository<Recipe>,
    ){}

    @Get()
    async all(): Promise<Recipe[]>{
        return this.recipeRepository.find();
    }
}
