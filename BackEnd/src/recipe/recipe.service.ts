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

  async findByUser(user): Promise<Recipe[]> {
    return await this.recipeRepository.find({
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
    const {instructions, ingredients, ...recipe} = body;
    const currentIngredients = await this.ingredientsService.findOneByRecipe({id});
    const currentInstructions = await this.instructionsService.findByRecipe({id});

    if(ingredients){
      //will store ingredients to be deleted
      let toBeDeleted = [];

      if(ingredients.length > 0){
      //check if ingredient is still available, if not then delete
    for(let i = 0 ; i < currentIngredients.length ; i++){
      for(let j = 0 ; j < ingredients.length ; j++ ){
        //if no id is present then contiunue to next iteration
        if(!ingredients[j]?.id){
          continue;
        }
        //if currentIngredient id is present in updated ingredients then break
        else if(currentIngredients[i].id === ingredients[j]?.id){
            break;
        }
        /*if currentIngredient id is not present at the end of the loop,
        add to list of ingredients to be deleted
        */  
        else if(j === ingredients.length - 1){
          toBeDeleted.push(currentIngredients[i]);
        }
      }
    }
  }
  else{
    toBeDeleted = currentIngredients;
  }
    //delete unavailable ingredients
    if(toBeDeleted.length > 0){
      toBeDeleted.forEach((ingredient)=>{
        this.ingredientsService.delete(ingredient.id);
      })
    }

    await this.ingredientsService.bulkUpdate(ingredients, recipe);
    }

    if(instructions){
       //will store instructions to be deleted
       let toBeDeleted = [];

       if(instructions.length > 0){
       //check if instruction is still available, if not then delete
     for(let i = 0 ; i < currentInstructions.length ; i++){
       for(let j = 0 ; j < instructions.length ; j++ ){
         //if no id is present then contiunue to next iteration
         if(!instructions[j]?.id){
           continue;
         }
         //if currentInstruction id is present in updated instructions then break
         else if(currentInstructions[i].id === instructions[j]?.id){
             break;
         }
         /*if currentInstruction id is not present at the end of the loop,
         add to list of instructions to be deleted
         */  
         else if(j === instructions.length - 1){
           toBeDeleted.push(currentInstructions[i]);
         }
       }
     }
    }
    else{
      toBeDeleted = currentInstructions;
    }
     //delete unavailable instructions
     if(toBeDeleted.length > 0){
       toBeDeleted.forEach((instruction)=>{
         this.instructionsService.delete(instruction.id);
       })
     }

    await this.instructionsService.bulkUpdate(instructions, recipe);
    
  }
    
    return await this.recipeRepository.update(id,recipe);
  }

  async delete(id): Promise<any>{
    this.recipeRepository.delete(id);
  }
}
