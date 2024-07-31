import { NavLink } from "react-router-dom";
import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";
import SearchBar from "../Search/SearchBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBreadSlice, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { baseurl } from "../../routes";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loadingScreenDisplayIndex, setLoadingScreenDisplayIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const display = [
    <div className="flex flex-col items-center justify-center bg-black bg-opacity-35 w-[250px] h-[250px] rounded-md">
      <FontAwesomeIcon className="animate-spin text-3xl" icon={faSpinner} />
      <div className="text-xl">loading...</div>
    </div>,
    <div className="flex flex-col items-center justify-center bg-black bg-opacity-35 w-[250px] h-[250px] rounded-md text-2xl text-[#ff0000]">{errorMessage}</div>,
  ];

  const getImage = (recipe)=>{
    axios.get(`${baseurl}/recipes/recipe-pictures/${recipe.id}`,{
      responseType: "blob"
    })
    .then((pic)=>{
      document.getElementById(`${recipe.id}`).src= URL.createObjectURL(pic.data);
    })
    .catch((err)=>console.error(err));
  }

  useEffect(() => {
    axios
      .get(`${baseurl}/recipes/all`)
      .then((fetchedRecipes) => {
        setRecipes(fetchedRecipes.data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(`Error: ${err.message}`);
        setLoadingScreenDisplayIndex(1);
        console.log("an error was encountered while fetching data");
        console.error(err);
      });
  }, []);

  const updateRecipes = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const drawTiles = (recipe) => {
    return (
      <div
        key={recipe.id}
        className="m-2 p-2 h-fit text-white transition-all duration-[200ms] border-[1px] bg-black bg-opacity-25 border-white hover:border-opacity-45 border-opacity-25 rounded-[24px]"
      >
        <div className="min-h-[150px] sm:min-h-[240px] p-2 rounded-[20px] bg-black bg-opacity-50 flex items-center justify-center">
        <img
        loading="lazy"
        onLoadStart={getImage(recipe)}
        id={recipe.id}
        alt={recipe.name} className="rounded-[18px] lg:h-[300px] "/>
        </div>
        <div className="flex flex-col p-2 mt-2 border-[1px] rounded-[18px] border-black border-opacity-20 bg-black bg-opacity-65">
          <div className="p-1 font-bold flex justify-center text-xs sm:text-sm md:text-base">
            {recipe.name}
          </div>
          <span className="font-thin flex justify-center text-xs sm:text-sm md:text-base">
            {recipe.estimatedTime}
          </span>
        </div>
        <div className=" my-1 font-semibold flex justify-center text-center hover:cursor-pointer">
        <NavLink
        className="bg-black text-xs sm:text-sm md:text-base block bg-opacity-70 mb-[2%] hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-3xl w-[50%] font-medium text-white"
        to={`/Recipes/recipe-instructions/${recipe?.id}`}>
          <div >
              Full Recipe
          </div>
          </NavLink>
        </div>
      </div>
    );
  };

  if(loading){

    return(
      <div className="min-h-full h-screen w-full">
        <NavBar/>
      <div
      id="loadingScreen"
      className="flex text-white justify-center items-center min-h-full h-screen w-full backdrop-blur-xl bg-gray-600 bg-opacity-65"
    >
      {display[loadingScreenDisplayIndex]}
    </div>
    <Footer/>
    </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col min-h-full h-screen">
        <NavBar />
        <div className="bg-gray-600 bg-opacity-65">
          <div className="">
            <SearchBar context="recipes" setResults={setRecipes} loadingState={loading} setLoadingState={setLoading} />
            <div className="min-h-full">
              {
                recipes.length > 0 ?
              (<div className="grid grid-cols-2 md:grid-cols-3">
                {recipes.map(drawTiles)}
              </div>)
            :
            (
              <div className="min-h-full h-screen w-full flex flex-col items-center justify-center">
        <FontAwesomeIcon className="text-5xl animate-bounce" icon={faBreadSlice}/>
        <div className="text-black text-lg">Sorry, looks like nothing came up...</div>
      </div>
            )  
            }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
