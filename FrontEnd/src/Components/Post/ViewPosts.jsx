import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseurl } from "../../routes";
import { NavLink, useLoaderData } from "react-router-dom";
import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";

export default function ViewPosts() {
    const user = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [display, setDisplay] = useState(
    <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-black bg-opacity-65 rounded-lg ">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl" />
      <div className="text-xl">Loading...</div>
    </div>
  );

  const drawPosts = (post) => {
    const time = new Date(post.postedAt).toLocaleTimeString();
    const timestamp = time.slice(0, 4) + time.slice(7);

    return (
      <NavLink
        key={post.id}
        to={`/communities/CommunityPage/${post.communityId}/Posts/${post.id}`}
      >
        <div className="p-2 min-h-[70px] font-thin text-xs md:text-sm hover:bg-opacity-75 transition-all bg-black bg-opacity-65 border-[1px] border-white border-opacity-20 hover:border-opacity-40 rounded-xl mb-2 mx-1">
          <div className="bg-white h-[54px] bg-opacity-20 rounded-md p-1 mb-1 ">
            {post.content}
          </div>
          <div className="text-end text-xs">{timestamp}</div>
        </div>
      </NavLink>
    );
  };

  const drawRecipes = (recipe) => {
    return (
      <NavLink key={recipe.id}
      to={`/Recipes/recipe-instructions/${recipe?.id}`}
      >
        <div className="bg-black min-h-[50px] bg-opacity-65 hover:bg-opacity-75 border-[1px] border-white border-opacity-20 hover:border-opacity-40 transition-all  text-xs md:text-sm font-thin mb-1 p-2 mx-1 rounded-lg">
          <div className="mb-1">Recipe: {recipe.name}</div>
          {
            recipe.ingredients.length > 0?

          <div
          className="bg-white bg-opacity-25 h-[30px] rounded-md p-1 mb-1"
          >Ingredients: 
            <span>{recipe.ingredients.length > 0 ? recipe?.ingredients[0]?.name : ""}</span>
            <span>{recipe.ingredients.length > 1 ? `, ${recipe?.ingredients[1]?.name}` : ""}</span>
            
             <span>{recipe.ingredients.length > 2 ? `, ${recipe?.ingredients[0]?.name}...` : ""}</span>
            </div>
            :
            <div
            className="bg-white bg-opacity-25 h-[30px] rounded-md p-1 mb-1"
            >
                no ingredients listed
            </div>
            }
        </div>
      </NavLink>
    );
  };

  useEffect(() => {
        axios
          .get(`${baseurl}/posts/user/${user.id}`)
          .then((fetchedPosts) => {
            setUserPosts(fetchedPosts.data);
            //console.log(fetchedPosts.data);
            setLoadingPosts(false);
          })
          .catch((err) => {
            console.error(err);
            console.log("inside fetched user posts");
            setDisplay(
              <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-black bg-opacity-65 rounded-lg ">
                <div className="text-xl text-[#ff0000]">
                  {err.message + " : " + err.code}
                </div>
              </div>
            );
            setLoading(false);
          });
        axios
          .get(`${baseurl}/recipes/user/${user.id}`)
          .then((fetchedRecipes) => {
            setUserRecipes(fetchedRecipes.data);
            //console.log(fetchedRecipes.data);
            setLoadingRecipes(false);
          })
          .catch((err) => {
            console.error(err);
            console.log("inside fetched user recipes");
            setDisplay(
              <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-black bg-opacity-65 rounded-lg ">
                <div className="text-xl text-[#ff0000]">
                  {err.message + " : " + err.code}
                </div>
              </div>
            );
            setLoading(false);
          });

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center backdrop-blur-[6px]">
        {display}
      </div>
    );
  }

  window.onload = () => {
    console.log("here");
    const tableOfUploadsTopHeight = document.getElementById("tableOfUploads").offsetTop;
    const tableOfUploadsHeight = document.getElementById("tableOfUploads").offsetHeight;
    const mainPageHeight = document.getElementById("mainPage").offsetHeight;
    const deltaHeight = tableOfUploadsHeight + tableOfUploadsTopHeight - mainPageHeight;
    if (deltaHeight > 0)
      document.getElementById("mainPage").style.height = `${
        mainPageHeight + deltaHeight
      }px`;
    console.log(
      `height: ${document.getElementById("mainPage").offsetHeight}`
    );
  }

  return (
    <div className="min-h-full h-screen">
        <NavBar/>
      <div
        className="min-h-full h-fit w-full flex flex-col bg-gray-600 bg-opacity-45 text-white p-2"
      >
        <div
        id="mainPage"
        >
        <h1 className="text-2xl text-center my-2 font-medium ">{`${user.username}'s Uploads`}</h1>
        <div id="tableOfUploads" className="h-full w-full flex flex-col lg:flex-row p-2 bg-gray-600 bg-opacity-80 rounded-lg">
          <div id="recipes" className="lg:w-[50%] flex flex-col p-1 border-b-[1px] lg:border-b-0 lg:border-r-[1px]">
            <h2 className="text-center font-semibold text-xl p-2">Recipes</h2>
            <div>
              {loadingRecipes ? (
                <div className="flex flex-col ">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin text-3xl"
                  />
                  <div>Loading...</div>
                </div>
              ) : userRecipes.length > 0 ? (
                <div className="grid grid-cols-2">
                {userRecipes.map(drawRecipes)}
                </div>
              ) : (
                "Looks like you currently have no recipes"
              )}
            </div>
          </div>
          <div id="posts" className="lg:w-[50%] flex flex-col p-1">
            <h2 className="text-center text-xl font-semibold p-2">Posts</h2>
            <div>
              {loadingPosts ? (
                <div className="flex flex-col  items-center justify-center">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin text-3xl"
                  />
                  <div>Loading...</div>
                </div>
              ) : userPosts.length > 0 ? (
                <div className="grid grid-cols-2">
                {userPosts.map(drawPosts)}
                </div>
              ) : (
                "Looks like you currently have no posts avaialble"
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer/>
      </div>
  );
}
