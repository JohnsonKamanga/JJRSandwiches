import { Ingredient } from "./Ingredients";

export class Recipe{
    name;
    ingredients;
    image;
    estimatedPreparationTime;

    constructor(name, image, ingredients, time){
        this.name = name;
        this.image = image;
        this.ingredients = ingredients;
        this.estimatedPreparationTime = time;
    }
}