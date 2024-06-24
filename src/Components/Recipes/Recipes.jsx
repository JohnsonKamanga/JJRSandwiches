import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";
import SearchBar from "../Search/SearchBar";
import { Ingredient } from "./Ingredients";
import { Recipe } from "./Recipe";
import { useState } from "react";
import Image1 from "./image1.jpg";
import Image2 from "./image2.jpg";
import Image3 from "./image3.jpg";
import Image4 from "./image4.jpg";
import Image5 from "./image5.jpg";

export default function Recipes() {
  const [recipes, setRecipes] = useState([
    {
      name: "Chicken Sandwich",
      image: Image1,
      estimatedTime: "8 minutes",
      ingredients: [
        {
          name: "chicken",
          quantity: "200g",
        },
        {
          name: "brown bread",
          quantity: "400g",
        },
        {
          name: "cheese",
          quantity: "50g",
        },
        {
          name: "mayonaisse",
          quantity: "20ml",
        },
      ],
    },
    {
      name: "Ham Sandwich",
      image: Image2,
      estimatedTime: "10 minutes",
      ingredients: [
        {
          name: "chicken",
          quantity: "200g",
        },
        {
          name: "brown bread",
          quantity: "400g",
        },
        {
          name: "cheese",
          quantity: "50g",
        },
        {
          name: "mayonaisse",
          quantity: "20ml",
        },
      ],
    },
    {
      name: "Subway",
      image: Image3,
      estimatedTime: "20 minutes",
      ingredients: [
        {
          name: "chicken",
          quantity: "200g",
        },
        {
          name: "brown bread",
          quantity: "400g",
        },
        {
          name: "cheese",
          quantity: "50g",
        },
        {
          name: "mayonaisse",
          quantity: "20ml",
        },
      ],
    },
    {
      name: "Polony Sandwich",
      image: Image4,
      estimatedTime: "5 minutes",
      ingredients: [
        {
          name: "chicken",
          quantity: "200g",
        },
        {
          name: "brown bread",
          quantity: "400g",
        },
        {
          name: "cheese",
          quantity: "50g",
        },
        {
          name: "mayonaisse",
          quantity: "20ml",
        },
      ],
    },
    {
      name: "Grilled Cheese Sandwich",
      image: Image5,
      estimatedTime: "15 minutes",
      ingredients: [
        {
          name: "chicken",
          quantity: "200g",
        },
        {
          name: "brown bread",
          quantity: "400g",
        },
        {
          name: "cheese",
          quantity: "50g",
        },
        {
          name: "mayonaisse",
          quantity: "20ml",
        },
      ],
    },
  ]);

  const updateRecipes = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const drawTiles = (recipe) => {
    return (
      <div
        key={Math.random()}
        className="m-2 p-2 h-fit text-white transition-all duration-[200ms] border-[1px] bg-black bg-opacity-25 border-white hover:border-opacity-45 border-opacity-25 rounded-[24px]"
      >
        <img
          src={recipe.image}
          alt={recipe.name}
          className="rounded-[18px] "
        ></img>
        <div className="flex flex-col p-2 mt-2 border-[1px] rounded-[18px] border-black border-opacity-20 bg-black bg-opacity-65">
          <div className="p-1 font-bold flex justify-center text-xs sm:text-sm md:text-base">
            {recipe.name}
          </div>
          <span className=" font-light flex justify-center text-xs sm:text-sm md:text-base">
            {`${recipe.ingredients[0].name}, ${recipe.ingredients[1].name}, ${recipe.ingredients[2].name}...`}
          </span>
          <span className="font-thin flex justify-center text-xs sm:text-sm md:text-base">
            {recipe.estimatedTime}
          </span>
        </div>
        <div className=" my-1 font-semibold flex justify-center text-center hover:cursor-pointer">
          <NavLink
            to="/RecipeInstructions"
            className="transition-colors duration-[200ms] bg-[#f29260] hover:bg-[#f87058] w-[50%] rounded-3xl border-[1px] border-black border-opacity-40 p-1 text-xs sm:text-sm md:text-base"
          >
            <span> Full Recipe</span>
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col min-h-full h-screen">
        <NavBar />

        <SearchBar />
        <div className=" faq-transition ">
          <div className="grid grid-cols-2 md:grid-cols-3">
            {recipes.map(drawTiles)}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
