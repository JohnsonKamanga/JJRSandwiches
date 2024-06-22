import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { Recipe } from "./Recipe";
import { Ingredient } from "./Ingredients";
import Image1 from "./image4.jpg";
import BgImage from "./image5.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ingredients = [
  new Ingredient("Genoa salami", "3 slices"),
  new Ingredient("mortadella", "3 slices"),
  new Ingredient("capicola", "3 slices"),
  new Ingredient("provolone cheese", "3 slices"),
  new Ingredient("shredded lettuce", "1/4"),
  new Ingredient("thinly sliced medium tomato", "1"),
  new Ingredient("thinly sliced red onion", "1/4"),
  new Ingredient("olive oil", "2 tablespoons"),
  new Ingredient("red wine vinega", "1 tablespoon"),
  new Ingredient("dried oregano", "1 tablespoon"),
  new Ingredient("salt", "to taste"),
  new Ingredient("pepper", "to taste"),
  new Ingredient("mayonnaise", "1 tablespoon"),
  new Ingredient("yellow mustard", "1 tablespoon"),
];

const instructions = [
  "Slice the Italian sub roll horizontally, but do not cut all the way through. Open it up like a book.",
  "Start by layering the slices of Genoa salami, followed by the mortadella, capicola, and then the provolone cheese on one side of the roll.",
  "Evenly distribute the shredded lettuce over the meats and cheese.",
  "Add the thin slices of tomato and red onion.",
  "If using, add the banana peppers.",
  "Drizzle the olive oil and red wine vinegar evenly over the vegetables.",
  "Sprinkle the dried oregano, salt, and pepper to taste.",
  "If desired, spread mayonnaise on the top half of the roll and mustard on the bottom half before closing the sandwich.",
  "Close the sandwich and press down gently to help the ingredients meld together.",
  "Cut the sandwich into halves or thirds for easier handling.",
  "Serve immediately and enjoy your classic Italian sub sandwich!",
];

const myRecipe = new Recipe(
  "Classic Italian Sub Sandwich",
  Image1,
  ingredients,
  "15 minutes",
  instructions
);

export default function RecipeInstructions() {
  return (
    <div className="min-h-full h-screen">
      <NavBar />
      <div
        className="bg-center bg-cover"
        style={{
          backgroundImage: `url(${myRecipe.image})`,
        }}
      >
        <div className=" backdrop-blur-[6px] text-white">
          <div className="p-[2%]">
            <h1 className="font-bold text-center text-xl lg:text-3xl">
              {myRecipe.name}
            </h1>
            <p className="text-center text-lg">By anonymous...</p>
          </div>
          <div className="flex flex-col md:flex-row-reverse mx-1 text-center text-white">
            <div className="mb-[5%] md:ml-[4%] md:mb-[2%] grid grid-rows-[235px] grid-cols-2 md:grid-cols-1 md:grid-rows-[auto_300px] w-full md:w-[50%] p-1 font-thin">
              <div className="p-3 mr-[3%] rounded-[18px] bg-black bg-opacity-25">
                <img src={Image1} className="rounded-[16px]" />
                <p className="text-base md:text-lg">My {myRecipe.name}</p>
              </div>
              <div
                id="ingredients"
                className="p-4 overflow-y-auto rounded-[18px] ml-[3%] md:mt-[4%] bg-black bg-opacity-25 "
              >
                <p className="font-medium p-1 text-lg border-b-[1px] border-black border-opacity-45">
                  Ingredients
                </p>
                <div className="text-white rounded-[18px] bg-black bg-opacity-50">
                  {myRecipe.ingredients.map((ingredient) => {
                    return (
                      <div
                        key={ingredient.name}
                        className="p-3 flex flex-row text-xs md:text-sm border-b-[1px] border-black border-opacity-50"
                      >
                        <div className="font-[400] mr-1 text-end w-[40%]">
                          {ingredient.name}:
                        </div>
                        <div>{ingredient.quantity}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              id="instructions"
              className="flex flex-col p-4 mb-[2%] ml-1 md:mx-[2%] h-[600px] md:h-[700px] bg-black bg-opacity-25 rounded-[18px]"
            >
              <p className="font-medium mb-2 text-lg">Instructions</p>
              <div className="p-3 font-thin rounded-[16px] text-white bg-black bg-opacity-50 mx-2">
                {myRecipe.instructions.map((instruction) => {
                  return (
                    <div
                      key={instruction}
                      className="p-2 text-sm md:text-lg text-start"
                    >
                      <span className="font-medium">
                        {myRecipe.instructions.indexOf(instruction) + 1}
                      </span>
                      : {instruction}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
