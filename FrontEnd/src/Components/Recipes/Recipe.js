import { Ingredient } from "./Ingredients";

export class Recipe{
    name;
    ingredients;
    image;
    estimatedPreparationTime;
    instructions;

    constructor(name = "", image, ingredients = [], time = "", instructions = []){
        this.name = name;
        this.image = image;
        this.ingredients = ingredients;
        this.estimatedPreparationTime = time;
        this.instructions = instructions;
    }
}