import { useContext, useEffect, useRef, useState } from "react";
import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";
import { UserContext } from "../Accounts/UserContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faMinusCircle,
  faPen,
  faPlus,
  faSpinner,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { Recipe } from "../Recipes/Recipe";
import BgImage from "../Recipes/image2.jpg";
import { baseurl } from "../../routes";
import { Ingredient } from "../Recipes/Ingredients";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function EditRecipe() {
  const [recipe, imageURL] = useLoaderData();
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState();
  const [name, setName] = useState(recipe.name);
  const [estimatedTime, setEstimatedTime] = useState(
    recipe.estimatedPreparationTime
  );
  const [ingredient, setIngredient] = useState("");
  const [editIngredient, setEditIngredient] = useState();
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [image, setImage] = useState(imageURL);
  const ingredientsRef = useRef(ingredients);
  const [instruction, setInstruction] = useState("");
  const [editInstruction, setEditInstruction] = useState();
  const [instructions, setInstructions] = useState(recipe.instructions);
  const instructionsRef = useRef(instructions);
  const [ingredientsToBeDeleted, setIngredientsToBeDeleted] = useState([]);

  const [instructionsToBeDeleted, setInstructionsToBeDeleted] = useState([]);

  const [displayIndex, setDisplayIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const inputStyle =
    "bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-xl w-[80%]";
  const display = [
    <div className="flex flex-col">
      <FontAwesomeIcon className="animate-spin text-5xl" icon={faSpinner} />
      <div className="text-2xl">loading...</div>
    </div>,
    <div className="text-2xl text-[#ff0000]">{errorMessage}</div>,
  ];

  const handleIngredientsUpdate = () => {
    const newIngredient = new Ingredient(ingredient, ingredientQuantity);
    if (!editIngredient) {
      ingredientsRef.current = [...ingredients, newIngredient];
      setIngredients([...ingredients, newIngredient]);
    } else {
      let copy = [];
      for (let i = 0; i < ingredients.length; i++) copy.push(ingredients[i]);
      const targetIngredientIndex = ingredients.indexOf(editIngredient);
      editIngredient?.id
        ? (copy[targetIngredientIndex] = {
            ...newIngredient,
            id: editIngredient?.id,
          })
        : (copy[targetIngredientIndex] = newIngredient);
      ingredientsRef.current = copy;
      setIngredients(copy);
      setEditIngredient();
    }
    setIngredient("");
    setIngredientQuantity("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.display = "flex";
    const newRecipe = new Recipe(
      name,
      "",
      ingredients,
      estimatedTime,
      instructions
    );

    newRecipe.user = recipe.user;
    newRecipe.id = recipe.id;
    newRecipe.toBeDeleted = {
      instructions: instructionsToBeDeleted,
      ingredients: ingredientsToBeDeleted,
    };

    axios
      .put(`${baseurl}/recipes/${recipe.id}`, newRecipe)
      .then((res1) => {
        if (image !== imageURL)
          axios
            .putForm(`${baseurl}/recipes/${recipe.id}`, {
              image,
            })
            .then((res2) => {
              navigate(`/Recipes/recipe-instructions/${recipe.id}`);
            })
            .catch((err) => {
              console.error(err);
              setErrorMessage(`${err.code} : ${err.message}`);
              setDisplayIndex(1);
            });
        navigate(`/Recipes/recipe-instructions/${recipe.id}`);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(`${err.code} : ${err.message}`);
        setDisplayIndex(1);
      });
  };

  const drawIngredients = (ingredient) => {
    return (
      <div
        key={Math.random()}
        className="bg-transparent flex flex-row justify-center text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10"
      >
        <div className="w-[20%]">
          <FontAwesomeIcon
            icon={faMinusCircle}
            onClick={() => {
              let copy = [];
              copy.push(...ingredients);
              const index = ingredients.indexOf(ingredient);
              const removed = copy.splice(index, 1);
              if (removed[0]?.id) {
                setIngredientsToBeDeleted([
                  ...ingredientsToBeDeleted,
                  ...removed,
                ]);
              }
              ingredientsRef.current = copy;
              setIngredients(copy);
            }}
            className="hover:cursor-pointer transition-all hover:text-[#f87058]"
          />
        </div>
        <div className="w-[60%]">
          {ingredient.name} : {ingredient.quantity}
        </div>
        <div className="w-[20%]">
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => {
              setIngredient(ingredient.name);
              setIngredientQuantity(ingredient.quantity);
              setEditIngredient(ingredient);
            }}
            className="hover:cursor-pointer transition-all hover:text-[#f87058]"
          />
        </div>
      </div>
    );
  };

  const drawInstructions = (instruction) => {
    return (
      <div
        key={Math.random()}
        className="bg-transparent flex flex-row items-center text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10"
      >
        <div className="w-[20%]">
          <FontAwesomeIcon
            className="hover:cursor-pointer transition-all hover:text-[#f87058]"
            onClick={() => {
              let copy = [];
              for (let i = 0; i < instructions.length; i++) {
                copy.push(instructions[i]);
              }
              const index = instructions.indexOf(instruction);
              const removed = copy.splice(index, 1);
              //id of instruction is defined only if was retrived from the database
              if (removed[0]?.id) {
                setInstructionsToBeDeleted([
                  ...instructionsToBeDeleted,
                  ...removed,
                ]);
              }
              instructionsRef.current = copy;
              setInstructions(copy);
            }}
            icon={faMinusCircle}
          />
        </div>
        <div className="w-[60%]">{instruction.instruction}</div>
        <div className="w-[20%]">
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => {
              setInstruction(instruction.instruction);
              setEditInstruction(instruction);
            }}
            className="hover:cursor-pointer transition-all hover:text-[#f87058]"
          />
        </div>
      </div>
    );
  };

  /* useEffect(() => {
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
*/
  useEffect(() => {
    const tableTopHeight = document.getElementById("table").offsetTop;
    const tableHeight = document.getElementById("table").offsetHeight;
    const mainHeight = document.getElementById("main").offsetHeight;
    const deltaHeight = tableHeight + tableTopHeight - mainHeight;
    if (deltaHeight > 0)
      document.getElementById("main").style.height = `${
        mainHeight + deltaHeight
      }px`;
  }, [ingredients, instructions]);

  return (
    <div>
      <div className="min-h-full h-screen">
        <NavBar />
        <div
          className="h-full flex flex-row bg-cover bg-fit bg-fixed z-0"
          style={{
            backgroundImage: `url(${BgImage})`,
          }}
          id="main"
        >
          <div className="backdrop-blur-[6px] z-0 w-full flex flex-col items-center lg:items-start lg:flex-row">
            <div className="p-4 lg:w-[40%] h-[600px] text-xs sm:text-base flex flex-col text-white ">
              <form
                onSubmit={handleSubmit}
                className="p-2 h-full flex flex-col bg-black bg-opacity-25 rounded-xl items-center justify-center placeholder:text-center border-[1px] border-white border-opacity-20"
              >
                <div className="bg-black bg-opacity-65 mb-3 rounded-[24px] flex flex-col items-center justify-center p-1 w-[100px] h-[100px] sm:w-[120px] md:w-[150px] sm:h-[120px] md:h-[150px]">
                  <label
                    className="hover:cursor-pointer flex flex-col items-center justify-center"
                    htmlFor="pictures"
                  >
                    <img
                      id="displayPictures"
                      alt="recipe pictures"
                      src={image}
                      className="rounded-[18px]"
                    />
                  </label>
                  <input
                    id="pictures"
                    type="file"
                    accept="image/*"
                    src={image}
                    className="hidden"
                    onChange={(e) => {
                      const preview =
                        document.getElementById("displayPictures");
                      const reader = new FileReader();
                      reader.onload = () => {
                        preview.src = reader.result;
                      };
                      reader.readAsDataURL(e.target.files[0]);
                      setImage(e.target.files[0]);
                      preview.style.display = "block";
                    }}
                  ></input>
                </div>
                <div className="flex flex-row w-[260px] sm:w-[310px] md:w-[350px] lg:w-[365px] xl:w-[400px] items-center bg-black bg-opacity-65 rounded-xl my-1">
                  <label
                    htmlFor="recipeName"
                    className="w-[120px] font-medium text-white text-end p-2 border-r-[1px]"
                  >
                    <span>Name: </span>
                  </label>
                  <input
                    id="recipeName"
                    className={inputStyle}
                    type="text"
                    value={name}
                    placeholder="recipe name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-row w-[260px] sm:w-[310px] md:w-[350px] lg:w-[365px] xl:w-[400px] items-center bg-black bg-opacity-65 rounded-xl mb-1">
                  <label
                    htmlFor="estimatedTime"
                    className="w-[120px] font-medium text-white text-end p-2 border-r-[1px]"
                  >
                    Time:{" "}
                  </label>
                  <input
                    id="estimatedTime"
                    className={inputStyle}
                    type="text"
                    value={estimatedTime}
                    placeholder="estimated preperation time"
                    onChange={(e) => {
                      setEstimatedTime(e.target.value);
                    }}
                  ></input>
                </div>
                <div
                  className="flex flex-row w-[260px] sm:w-[310px] md:w-[350px] lg:w-[365px] xl:w-[400px] items-center justify-center bg-black bg-opacity-65 rounded-xl mb-1"
                  id="ingredeints_list"
                >
                  <label
                    htmlFor="ingredients"
                    className="w-[94px] font-medium text-white text-end p-2 border-r-[1px]"
                  >
                    <span>Ingredient: </span>
                  </label>
                  <input
                    id="ingredients"
                    className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 w-[40%]"
                    placeholder="add ingredient"
                    value={ingredient}
                    onChange={(e) => {
                      setIngredient(e.target.value);
                    }}
                  ></input>
                  <label htmlFor="quantity"></label>
                  <input
                    id="quantity"
                    placeholder="amount"
                    className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 w-[20%] lg:w-[23%]"
                    value={ingredientQuantity}
                    onChange={(e) => {
                      setIngredientQuantity(e.target.value);
                    }}
                  ></input>
                  <div
                    className="hover:cursor-pointer h-6 w-6 flex items-center justify-center hover:bg-white hover:bg-opacity-30 rounded-lg"
                    onClick={handleIngredientsUpdate}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </div>

                <div
                  id="instructions_list"
                  className="flex flex-row w-[260px] sm:w-[310px] md:w-[350px] lg:w-[365px] xl:w-[400px] items-center bg-black bg-opacity-65 rounded-xl mb-1"
                >
                  <label
                    className="w-[131px] font-medium text-white text-end p-2 border-r-[1px]"
                    htmlFor="instructions"
                  >
                    <span>Instruction: </span>
                  </label>
                  <textarea
                    id="instructions"
                    className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 w-[80%]"
                    placeholder="add instructions"
                    value={instruction}
                    onChange={(e) => {
                      setInstruction(e.target.value);
                    }}
                  ></textarea>
                  <div
                    className="hover:cursor-pointer h-8 w-8 flex items-center justify-center hover:bg-white hover:bg-opacity-30 rounded-lg"
                    onClick={() => {
                      if (!editInstruction) {
                        instructionsRef.current = [
                          ...instructions,
                          { instruction: instruction },
                        ];
                        setInstructions([
                          ...instructions,
                          { instruction: instruction },
                        ]);
                      } else {
                        let copy = [];
                        for (let i = 0; i < instructions.length; i++)
                          copy.push(instructions[i]);
                        const targetInstructionIndex =
                          instructions.indexOf(editInstruction);
                        editInstruction?.id
                          ? (copy[targetInstructionIndex] = {
                              instruction,
                              id: editInstruction?.id,
                            })
                          : (copy[targetInstructionIndex] = { instruction });
                        instructionsRef.current = copy;
                        setInstructions(copy);
                        setEditInstruction();
                      }
                      setInstruction("");
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </div>
                <button
                  className="bg-black w-16 h-10 block bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faUpload} />
                </button>
              </form>
            </div>
            <div
              id="table"
              className="flex flex-row md:w-[80%] lg:w-[60%] h-full p-4 text-white justify-center text-center"
            >
              <div className="w-[50%] overflow-y-auto  p-1 rounded-l-xl bg-black bg-opacity-30 border-r-[1px] ">
                <h2 className=" text-lg sm:text-xl md:text-2xl lg:text-3xl p-3 border-b-[1px] border-white">
                  Ingredients
                </h2>
                <div className="text-xs sm:text-base">
                  {ingredientsRef.current.map(drawIngredients)}
                </div>
              </div>
              <div className="w-[50%] overflow-y-scroll p-1 rounded-r-xl bg-black bg-opacity-30">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl p-3 border-b-[1px] border-white">
                  Instructions
                </h2>
                <div className="text-xs sm:text-base">
                  {instructionsRef.current.map(drawInstructions)}
                </div>
              </div>
            </div>
            <div
              id="loadingScreen"
              className="hidden justify-center items-center  absolute top-0 left-0 h-full w-full bg-black bg-opacity-70 backdrop-blur-3xl"
            >
              <div className="h-[250px] w-[250px] rounded-md bg-white bg-opacity-35 border-[1px] border-white text-xs sm:text-sm md:text-base border-opacity-30 p-2 text-center flex flex-col items-center justify-center">
                {display[displayIndex]}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
