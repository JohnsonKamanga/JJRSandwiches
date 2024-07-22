import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Recipe } from './recipe.entity';
import { IngredientsService } from 'src/ingredient/ingredient.service';
import { InstructionsService } from 'src/instruction/instruction.service';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    private ingredientsService: IngredientsService,
    private instructionsService: InstructionsService,
  ) {}

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async findOne(id): Promise<Recipe | null> {
    return await this.recipeRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user:true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async findByQuery(query): Promise<Recipe[]>{
    return await this.recipeRepository.find({
      where:[
        {
          name:ILike(query)
        },
        {
          ingredients:{
            name:ILike(query)
          }
        }
      ],
      relations:{
        user:true,
        ingredients: true,
        instructions: true,
      }
    })
  }

  async findOneByUser(user): Promise<Recipe | null> {
    return await this.recipeRepository.findOne({
      select: {
        id: true,
        name: true
      },

      where: {
        user: user,
      },
      relations: {
        user: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async create(body): Promise< Recipe | null>{
    let {instructions, ingredients, ...result} = body;
    const recipe = await this.recipeRepository.save(result);
    for(let i = 0; i < instructions?.length; i++){
        this.instructionsService.create({...instructions[i], recipe: recipe});
    }
    
    for(let i = 0 ; i < ingredients?.length ; i++){
        this.ingredientsService.create({...ingredients[i], recipe: recipe});
    }

    return {...recipe,
        ingredients: ingredients,
        instructions: instructions
    };
  }

  async update(id, body): Promise<any>{
    return await this.recipeRepository.update(id,body)
  }

  async delete(id): Promise<any>{
    this.recipeRepository.delete(id);
  }
}
