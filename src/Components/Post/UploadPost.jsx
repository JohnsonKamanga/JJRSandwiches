import { useContext, useEffect, useRef, useState } from "react";
import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";
import { UserContext } from "../Accounts/UserContext";
import axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Recipe } from "../Recipes/Recipe";

export default function UploadPost() {
  const baseurl = "http://localhost:8000/api";
  const { token } = useContext(UserContext);
  const [decodedToken, setDecodedToken] = useState();
  const [name, setName] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientsRef = useRef(ingredients);
  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState([]);
  const instructionsRef = useRef(instructions);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const display = [
    <div className="flex flex-col">
      <FontAwesomeIcon className="animate-spin text-5xl" icon={faSpinner} />
      <div className="text-2xl">loading...</div>
    </div>,
    <div className="text-2xl text-[#ff0000]">{errorMessage}</div>,
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = new Recipe(
      name,
      "",
      ingredients,
      estimatedTime,
      instructions
    );
    axios
      .post(`${baseurl}/recipes`, {
        ...newRecipe,
        user: { id: decodedToken?.sub },
      })
      .then((recipe) => {
        console.log("recipe uploaded successfully");
        console.log(recipe.data);
      })
      .catch((err) => {
        console.log("an error was encountered while uploading the recipe");
        console.error(err);
      });
  };

  const drawIngredients = (ingredient) => {
    return <div className="text-black">{ingredient.ingredient}</div>;
  };

  const drawInstructions = (instruction) => {
    return <div className="text-black">{instruction.instruction}</div>;
  };

  useEffect(() => {
    axios
      .post(`${baseurl}/auth/decode`, {
        access_token: token?.data?.access_token,
      })
      .then((dToken) => {
        setDecodedToken(dToken.data);
        document.getElementById("loadingScreen").style.display = "none";
      })
      .catch((err) => {
        setErrorMessage(`Error: ${err.message}`);
        setDisplayIndex(1);
        console.log("an error was encountered while fetching data");
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div className="min-h-full h-screen">
        <NavBar />
        <div className="h-[88%] flex flex-row relative">
          <form
            onSubmit={handleSubmit}
            className="bg-green-600 flex flex-col w-[50%] placeholder:text-center"
          >
            <div>
              <label htmlFor="recipeName"></label>
              <input
                id="recipeName"
                className=""
                type="text"
                value={name}
                placeholder="recipe name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="estimatedTime"></label>
              <input
                id="estimatedTime"
                className=""
                type="text"
                value={estimatedTime}
                placeholder="estimated preperation time"
                onChange={(e) => {
                  setEstimatedTime(e.target.value);
                }}
              ></input>
            </div>
            <div className="flex flex-row items-center" id="ingredeints_list">
              <label htmlFor="ingredients"></label>
              <textarea
                id="ingredients"
                className="w-[60%] rounded-lg"
                placeholder="add ingredient"
                value={ingredient?.value}
                onChange={(e) => {
                  setIngredient({ ingredient: e.target.value });
                }}
              ></textarea>
              <div
                className="hover:cursor-pointer"
                onClick={() => {
                  ingredientsRef.current = [...ingredients, ingredient];
                  setIngredients([...ingredients, ingredient]);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>

            <div id="instructions_list" className="flex flex-row items-center">
              <label htmlFor="instructions"></label>
              <textarea
                id="instructions"
                className="w-[60%] rounded-lg"
                placeholder="add instructions"
                value={instruction?.value}
                onChange={(e) => {
                  setInstruction({ instruction: e.target.value });
                }}
              ></textarea>
              <div
                className="hover:cursor-pointer"
                onClick={() => {
                  instructionsRef.current = [...instructions, instruction];
                  setInstructions([...instructions, instruction]);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
            <button
              className="rounded-r-2xl w-10 h-10 bg-[#f29260] hover:bg-[#f87058]"
              type="submit"
            >
              <FontAwesomeIcon icon={faUpload} />
            </button>
          </form>
          <div className="bg-red-300 w-[50%]">
            <div>
              <div className="text-3xl">Ingredints</div>
              <div>{ingredientsRef.current.map(drawIngredients)}</div>
            </div>
            <div>
              <div className="text-3xl">Instructions</div>
              <div>{instructionsRef.current.map(drawInstructions)}</div>
            </div>
          </div>
          <div
            id="loadingScreen"
            className="flex justify-center items-center  absolute top-0 left-0 h-full w-full backdrop-blur-xl"
          >
            {display[displayIndex]}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
