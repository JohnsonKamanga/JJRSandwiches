import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { Recipe } from "./Recipe";
import { Ingredient } from "./Ingredients";
import Image1 from "./image4.jpg";
import BgImage from "./image5.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { baseurl } from "../../routes";

export default function RecipeInstructions() {
  const recipe = useLoaderData();
  const [image, setImage] = useState();
  const drawIngredients = (ingredient) => {
    return (
      <div
        key={ingredient?.id}
        className="p-2 flex flex-row text-start text-sm md:text-lg"
      >
        <div className="font-[400] mr-1 w-[40%]">
          {ingredient?.name}: {ingredient?.quantity}
        </div>
      </div>
    );
  };

  const drawInstructions = (instruction) => {
    return (
      <div
        key={instruction.instruction}
        className="p-2 text-sm md:text-lg text-start"
      >
        <span className="font-medium">
          {recipe.instructions.indexOf(instruction) + 1}
        </span>
        . {instruction.instruction}
      </div>
    );
  };

  useEffect(() => {
    axios
      .get(`${baseurl}/recipes/recipe-pictures/${recipe.id}`, {
        responseType: "blob",
      })
      .then((img) => {
        setImage(URL.createObjectURL(img.data));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-full h-screen">
      <NavBar />
      <div
        id="main"
        className="bg-center bg-cover bg-fixed min-h-full"
        style={{
          backgroundImage: `url(${image})`,
        }}
        onLoad={() => {
          const tableTopHeight = document.getElementById("table").offsetTop;
          const tableHeight = document.getElementById("table").offsetHeight;
          const mainHeight = document.getElementById("main").offsetHeight;
          const deltaHeight = tableHeight + tableTopHeight - mainHeight;
          if(deltaHeight > 0)
          document.getElementById("main").style.height = `${mainHeight + deltaHeight}px`;
        }}
      >
        <div className="min-h-full h-screen backdrop-blur-[6px]">
          <div className="p-[2%]">
            <div className="p-3 text-white w-fit flex flex-row rounded-[18px] bg-black bg-opacity-40">
              <img
                src={image}
                alt="recipe image"
                className="rounded-[16px] h-[200px]"
              />
              <div className="ml-3 flex flex-col justify-end">
                <h1 className="font-bold p-2 text-xl lg:text-[44px]">
                  {recipe?.name}
                </h1>
                <span className="text-lg p-2">by {recipe?.user?.username}</span>
              </div>
            </div>
          </div>
          <div id="table" className="p-[2%]">
            <div className="flex flex-col  md:flex-row mx-1 text-center text-white rounded-lg bg-black bg-opacity-30">
              <div
                id="ingredients"
                className="p-4 md:w-[45%] overflow-y-auto md:border-r-[1px] border-white border-opacity-35"
              >
                <h2 className="font-medium mb-2 text-2xl md:border-b-[1px] border-white border-opacity-35">
                  Ingredients
                </h2>
                <div className="p-3  min-h-[70px] text-white rounded-[16px] ">
                  {recipe?.ingredients.map(drawIngredients)}
                </div>
              </div>
              <div
                id="instructions"
                className="flex flex-col p-4 md:w-[55%] rounded-[18px]"
              >
                <h2 className="font-medium mb-2 text-2xl border-b-[1px] border-white border-opacity-35">
                  Instructions
                </h2>
                <div className="p-3 min-h-[70px] font-thin rounded-[16px] text-white">
                  {recipe?.instructions.map(drawInstructions)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
