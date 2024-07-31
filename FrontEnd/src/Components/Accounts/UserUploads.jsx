import { faSpinner, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseurl } from "../../routes";
import { UserContext } from "./UserContext";
import { NavLink } from "react-router-dom";
import EditPost from "../Post/EditPost";

export default function UserUploads() {
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  //state variable to for indidcating recipes are still being fetched
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  //state variable for indicating that posts are still being fetched
  const [loadingPosts, setLoadingPosts] = useState(true);
  //state vaiable used to store a decode token
  const [decodedToken, setDecodedToken] = useState();
  //state variable to store the context of the recipe/post to be deleted
  const [targetUpload, setTargetUpload] = useState();
  //state variable to store the context of the post to be edited
  const [targetEditPost, setTargetEditPost] = useState();
  //state variable to control whether the Post Editing component is visisble
  const [editPost, setEditPost] = useState(false);
  const [display, setDisplay] = useState(
    <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-black bg-opacity-45 rounded-lg text-white">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl" />
      <div className="text-xl">Loading...</div>
    </div>
  );
  const drawPosts = (post) => {
    const time = new Date(post.postedAt).toLocaleTimeString();
    const timestamp = time.slice(0, 4) + time.slice(7);
    const elementID = `Post-${post.id}`;
    return (
      <div key={post.id} id={elementID}>
        <div className="p-2 min-h-[70px] font-thin text-xs md:text-sm transition-all bg-black bg-opacity-45 rounded-xl mb-2 mx-1">
          <NavLink
            to={`/communities/CommunityPage/${post.communityId}/Posts/${post.id}`}
          >
            <div className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-all h-[54px] rounded-md p-1 mb-1">
              {post.content}
            </div>
          </NavLink>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row">
              <div 
              onClick={()=>{
                setTargetEditPost(post);
                setEditPost(true);
              }}
              className="mx-1 hover:cursor-pointer hover:text-[#f87058]">
                edit
              </div>
              <div
                className="mx-1 hover:cursor-pointer hover:text-[#f87058]"
                onClick={() => {
                  const element = document.getElementById(elementID);
                  const deletePopUp =
                    document.getElementById("deleteConfirmation");
                  if (element && deletePopUp) {
                    setTargetUpload({
                      id: post.id,
                      context: "post",
                    });
                    deletePopUp.style.top = `${element.offsetTop}px`;
                    deletePopUp.style.display = "flex";
                  }
                }}
              >
                delete
              </div>
            </div>
            <div className="text-end text-xs">{timestamp}</div>
          </div>
        </div>
      </div>
    );
  };

  const drawRecipes = (recipe) => {
    const elementID = `Recipe-${recipe.id}`;
    return (
      <div key={recipe.id} id={`Recipe-${recipe.id}`}>
        <div className="bg-black bg-opacity-45 min-h-[50px] text-xs md:text-sm font-thin mb-1 p-2 mx-1 rounded-lg">
          <NavLink to={`/Recipes/recipe-instructions/${recipe?.id}`}>
            <div className="bg-black bg-opacity-45 hover:bg-opacity-60 transition-all p-2 rounded-md">
              <div className="mb-1">Recipe: {recipe.name}</div>
              {recipe.ingredients.length > 0 ? (
                <div className="bg-white bg-opacity-25 h-[30px] rounded-[4px] p-1 mb-1">
                  Ingredients:
                  <span>
                    {recipe.ingredients.length > 0
                      ? recipe?.ingredients[0]?.name
                      : ""}
                  </span>
                  <span>
                    {recipe.ingredients.length > 1
                      ? `, ${recipe?.ingredients[1]?.name}`
                      : ""}
                  </span>
                  <span>
                    {recipe.ingredients.length > 2
                      ? `, ${recipe?.ingredients[0]?.name}...`
                      : ""}
                  </span>
                </div>
              ) : (
                <div className="bg-white bg-opacity-25 h-[30px] rounded-md p-1 mb-1">
                  no ingredients listed
                </div>
              )}
            </div>
          </NavLink>
          <div className="flex flex-row">
            <NavLink
            to={`/Recipes/edit-recipe/${recipe.id}`}
            className="mx-1 hover:cursor-pointer hover:text-[#f87058]">
              edit
            </NavLink>
            <div
              className="mx-1 hover:cursor-pointer hover:text-[#f87058]"
              onClick={() => {
                const element = document.getElementById(elementID);
                const deletePopUp =
                  document.getElementById("deleteConfirmation");
                if (element && deletePopUp) {
                  setTargetUpload({
                    id: recipe.id,
                    context: "recipe",
                  });
                  deletePopUp.style.top = `${element.offsetTop}px`;
                  deletePopUp.style.display = "flex";
                }
              }}
            >
              delete
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    axios
      .post(`${baseurl}/auth/decode`, {
        access_token: token?.data?.access_token,
      })
      .then((dToken) => {
        setDecodedToken(dToken.data);
        axios
          .get(`${baseurl}/posts/user/${dToken.data.sub}`)
          .then((fetchedPosts) => {
            setUserPosts(fetchedPosts.data);
            setLoadingPosts(false);
          })
          .catch((err) => {
            console.error(err);
            console.log("inside fetched user posts");
            setDisplay(
              <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-black bg-opacity-65 rounded-lg">
                <div className="text-xl text-[#ff0000]">
                  {err.message + " : " + err.code}
                </div>
              </div>
            );
            setLoading(false);
          });
        axios
          .get(`${baseurl}/recipes/user/${dToken.data.sub}`)
          .then((fetchedRecipes) => {
            setUserRecipes(fetchedRecipes.data);
            setLoadingRecipes(false);
          })
          .catch((err) => {
            console.error(err);
            console.log("inside fetched user recipes");
            setDisplay(
              <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-black bg-opacity-65 rounded-lg">
                <div className="text-xl text-[#ff0000]">
                  {err.message + " : " + err.code}
                </div>
              </div>
            );
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        console.log("inside decode token");
        setDisplay(
          <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-black bg-opacity-65 rounded-lg">
            <div className="text-xl text-[#ff0000]">
              {err.message + " : " + err.code}
            </div>
          </div>
        );
      });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center backdrop-blur-[6px]">
        {display}
      </div>
    );
  }

  return (
    <div
      id="main"
      className="min-h-screen w-full flex flex-col text-white backdrop-blur-[6px] p-2 relative"
    >
      <h1 className="text-3xl text-center font-medium my-2">Your Uploads</h1>
      <div
        id="table"
        className="h-full w-full flex flex-col lg:flex-row p-2 bg-black bg-opacity-30 rounded-lg"
      >
        <div
          id="recipes"
          className="lg:w-[50%] overflow-y-scroll flex flex-col items-center border-b-[1px] lg:border-b-0 lg:border-r-[1px] p-2"
        >
          <h2 className="text-center text-2xl font-semibold mb-1">Recipes</h2>
          <div>
            {loadingRecipes ? (
              <div className="flex flex-col items-center justify-center">
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
        <div
          id="posts"
          className="lg:w-[50%] overflow-y-scroll flex flex-col justify-center items-center p-2"
        >
          <h2 className="text-center text-2xl font-semibold mb-1">Posts</h2>
          <div>
            {loadingPosts ? (
              <div className="flex flex-col items-center justify-center">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin text-3xl"
                />
                <div>Loading...</div>
              </div>
            ) : userPosts.length > 0 ? (
              <div className="grid grid-cols-2">{userPosts.map(drawPosts)}</div>
            ) : (
              "Looks like you currently have no posts avaialble"
            )}
          </div>
          <div
            className="fixed hidden flex-col items-center min-h-[20%] md:min-h-[30%] p-2 z-40 w-full top-0 left-0 bg-black bg-opacity-75 backdrop-blur-lg"
            id="deleteConfirmation"
          >
            <div className="mt-10 flex flex-col justify-center items-center">
              <p className="text-2xl">
                Are you sure you want do delete this {targetUpload?.context}?
              </p>
              <div className="flex flex-row mt-3">
                <div
                  className="p-2 h-fit text-xl mx-1 hover:cursor-pointer hover:text-[#f87058] bg-black bg-opacity-30 border-[1px] border-white border-opacity-20 rounded-md"
                  onClick={() => {
                    const element = document.getElementById("loadingPopUp");
                    const deletePopUp = document.getElementById("deleteConfirmation");
                    element.style.top = `${deletePopUp.offsetTop}px`;
                    element.style.display="flex";
                    setDisplay(
                      <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-white bg-opacity-35 rounded-lg text-white">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin text-4xl"
                        />
                        <div className="text-xl">Loading...</div>
                      </div>
                    );
                    if (targetUpload.context === "post") {
                      axios
                        .delete(`${baseurl}/posts/${targetUpload.id}`)
                        .then(async(res) => {
                          setUserPosts((await axios.get(`${baseurl}/posts/user/${decodedToken.sub}`)).data);
                          setDisplay(
                            <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-white bg-opacity-35 rounded-lg text-white">
                        <div className="text-xl">post deleted</div>
                      </div>
                          )
                        })
                        .catch((err) => {
                          setDisplay(
                            <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-black bg-opacity-65 rounded-lg">
                              <div className="text-xl text-[#ff0000]">
                                {err.message + " : " + err.code}
                              </div>
                            </div>
                          );
                        });
                    } else {
                      axios
                        .delete(`${baseurl}/recipes/${targetUpload.id}`)
                        .then(async(res) => {
                          setUserRecipes((await axios.get(`${baseurl}/recipes/user/${decodedToken.sub}`)).data);
                          setDisplay(
                            <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-white bg-opacity-35 rounded-lg text-white">
                        <div className="text-xl">recipe deleted</div>
                      </div>
                          )
                        })
                        .catch((err) => {
                          setDisplay(
                            <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-black bg-opacity-65 rounded-lg">
                              <div className="text-xl text-[#ff0000]">
                                {err.message + " : " + err.code}
                              </div>
                            </div>
                          );
                        });
                    }
                  }}
                >
                  Yes
                </div>
                <div
                  className="p-2 h-fit text-xl mx-1 hover:cursor-pointer hover:text-[#f87058] bg-black bg-opacity-30 border-[1px] border-white border-opacity-20 rounded-md"
                  onClick={() => {
                    const element =
                      document.getElementById("deleteConfirmation");
                    if (element) {
                      element.style.display = "none";
                    }
                  }}
                >
                  No
                </div>
              </div>
            </div>
          </div>
          <div
            id="loadingPopUp"
            className="fixed hidden flex-col items-center justify-center min-h-[20%] p-2 z-50 w-full top-0 left-0 bg-black bg-opacity-65 backdrop-blur-lg"
          >
            <div 
            className="bg-white absolute top-5 left-5 flex hover:cursor-pointer items-center justify-center w-10 h-10 bg-opacity-30 hover:text-[#f87058] hover:bg-opacity-40 border-[1px] border-black  transition-all duration-200 p-2 rounded-xl font-medium text-white"
            onClick={()=>{
              const loadingPopUp = document.getElementById("loadingPopUp");
              const deletePopUp = document.getElementById("deleteConfirmation");
              if(loadingPopUp && deletePopUp){
                loadingPopUp.style.display = "none";
                deletePopUp.style.display = "none";
              }
            }}
            >
              <FontAwesomeIcon icon={faX}/>
            </div>
           <div>{display}</div>
          </div>{
          editPost &&
          <EditPost decodedToken={decodedToken} post={targetEditPost} setUserPosts={setUserPosts} editPost={editPost} setEditPost={setEditPost}/>
        }
        </div>
      </div>
    </div>
  );
}
