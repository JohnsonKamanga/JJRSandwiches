import { useState } from "react"
import RecipeInstructions from "./RecipeInstructions"
import RecipeLists from "./RecipeLists"


export default function Recipes(){
    const [displayIndex, setDisplayIndex] = useState(0);
    const [chosenRecipe, setChosenRecipe] = useState('');
    const display = [
        <RecipeLists setChosenRecipe = {setChosenRecipe} setDisplayIndex = {setDisplayIndex} />,
        <RecipeInstructions setDisplayIndex = {setDisplayIndex} chosenRecipe = {chosenRecipe} />
    ]
    return(
        <div>
            {display[displayIndex]}
        </div>
    )
}