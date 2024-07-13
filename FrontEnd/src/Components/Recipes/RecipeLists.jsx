import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";
import SearchBar from "../Search/SearchBar";
import { useEffect, useState } from "react";
import Image1 from "./image1.jpg";
import Image2 from "./image2.jpg";
import Image3 from "./image3.jpg";
import Image4 from "./image4.jpg";
import Image5 from "./image5.jpg";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function RecipeLists(props) {
  const setChosenRecipe = props.setChosenRecipe;
  const setDisplayIndex = props.setDisplayIndex;
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
  const baseurl = 'http://localhost:8000/api';
  const [loadingScreenDisplayIndex, setLoadingScreenDisplayIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const display = [
    <div className="flex flex-col">
      <FontAwesomeIcon className="animate-spin text-5xl" icon={faSpinner} />
      <div className="text-2xl">loading...</div>
    </div>,
    <div className="text-2xl text-[#ff0000]">{errorMessage}</div>,
  ];

  useEffect(()=>{
    axios.get(`${baseurl}/recipes/all`)
    .then((fetchedRecipes)=>{
      setRecipes(fetchedRecipes.data);
      document.getElementById("loadingScreen").style.display = "none";
    })
    .catch((err)=>{
      setErrorMessage(`Error: ${err.message}`);
      setLoadingScreenDisplayIndex(1);
      console.log("an error was encountered while fetching data");
      console.error(err);
    })
  },[])

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
          <span className="font-thin flex justify-center text-xs sm:text-sm md:text-base">
            {recipe.estimatedTime}
          </span>
        </div>
        <div className=" my-1 font-semibold flex justify-center text-center hover:cursor-pointer">
          <div
          onClick={()=> {
            setChosenRecipe(recipe);
            setDisplayIndex(1);
          }}
            className="transition-colors duration-[200ms] bg-[#f29260] hover:bg-[#f87058] w-[50%] rounded-3xl border-[1px] border-black border-opacity-40 p-1 text-xs sm:text-sm md:text-base"
          >
            <span> Full Recipe</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col min-h-full h-screen">
        <NavBar />
        <div className="relative">
        <SearchBar />
        <div className=" faq-transition ">
          <div className="grid grid-cols-2 md:grid-cols-3">
            {recipes.map(drawTiles)}
          </div>
        </div>
        
        <div
            id="loadingScreen"
            className="flex justify-center items-center  absolute top-0 left-0 h-full w-full backdrop-blur-xl"
          >
            {display[loadingScreenDisplayIndex]}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
