import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Recipes from "./Components/Recipes/Recipes";
import AboutUs from "./Components/AboutUs/AboutUs";
import FAQ from "./Components/FAQ/FAQ";
import LoginPage from "./Components/Accounts/LoginPage";
import UploadPost from "./Components/Post/UploadPost";
import RecipeInstructions from "./Components/Recipes/RecipeInstructions";
import Communities from "./Components/Communities/Communities";
import ProfileCreation from "./Components/Accounts/ProfileCreation";
import CommunityPage from "./Components/Communities/CommunityPage";
import ViewPost from "./Components/Post/ViewPost";
import ViewAccount from "./Components/Accounts/ViewAccount";
import SignUpPage from "./Components/Accounts/SignUpPage";
import AccountPage from "./Components/Accounts/AccountPage";
import axios from "axios";
import ViewPosts from "./Components/Post/ViewPosts";
import EditRecipe from "./Components/Recipes/EditRecipe";
import Attributions from "./Components/Attributions/Attributions";

export const baseurl = 'https://jjrsandwiches-backend.onrender.com/api';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/HomePage",
    element: <HomePage />,
  },
  {
    path: "/Recipes",
    element: <Recipes />,
  },
  {
    path: "/FAQ",
    element: <FAQ />,
  },
  {
    path: "/LoginPage",
    element: <LoginPage />,
  },
  {
    path: "/UploadPost",
    element: <UploadPost />,
  },
  {
    path: "/Recipes/recipe-instructions/:recipeId",
    element: <RecipeInstructions />,
    loader: async({params})=>{
      return (await axios.get(`${baseurl}/recipes/${params.recipeId}`)).data
    }
  },
  {
    path: "/Communities",
    element: <Communities />,
  },
  {
    path: "/AboutUs",
    element: <AboutUs />,
  },
  {
    path: "/ProfileCreation",
    element: <ProfileCreation />,
  },{
    path: "/communities/CommunityPage/:communityId",
    element: <CommunityPage/>,
    loader: async({params})=>{
      const posts = (await axios.get(`${baseurl}/posts/community/${params.communityId}`)).data;
      const community = (await axios.get(`${baseurl}/communities/${params.communityId}`)).data;
      return [posts, community];
    }
  },
  {
    path: "/communities/CommunityPage/:communityId/search",
    element: <CommunityPage/>,
    loader: async({params,request})=>{
      const  searchQuery = (new URL(request.url)).searchParams.get("query");
      const community = (await axios.get(`${baseurl}/communities/${params.communityId}`)).data;
      
     const posts= searchQuery!=='' ?
         (await axios.get(`${baseurl}/posts/community/search?id=${params.communityId}&query=${searchQuery}`)).data
      : (await axios.get(`${baseurl}/posts/community/${params.communityId}`)).data;
      return [posts, community];
      }
  },
  {
    path: "/communities/CommunityPage/:communityId/Posts/:postId",
    element: <ViewPost/>,
    loader: async({params})=>{
      return (await axios.get(`${baseurl}/posts/${params.postId}`)).data;
    }
  },
  {
    path: "/ViewAccount",
    element: <ViewAccount/>
  },
  {
    path: "/SignUpPage",
    element: <SignUpPage/>
  },
  {
    path: "/AccountPage/:pageName",
    element: <AccountPage/>,
    loader: ({params})=>{
      const pageName = params.pageName ;
      return pageName;
    }
  },
  {
    path: "/AccountPage",
    element: <AccountPage/>,
    loader: ()=>{
      return "Bio";
    }
  },
  {
    path: "/ViewPosts/:userID",
    element: <ViewPosts/>,
    loader: async({params})=>{
      const user = (await axios.get(`${baseurl}/users/user/${params.userID}`)).data;
      return user;
    }
  },
  {
    path: "/Recipes/edit-recipe/:recipeID",
    element: <EditRecipe/>,
    loader: async({params})=>{
      const recipe = (await axios.get(`${baseurl}/recipes/${params.recipeID}`)).data;
      const imageBlob = (await axios.get(`${baseurl}/recipes/recipe-pictures/${params.recipeID}`,{ responseType:"blob",})).data
      const imageURL = URL.createObjectURL(imageBlob);

      return [recipe, imageURL];
    }
  },
  {
    path: "/Attributions",
    element: <Attributions/>
  }
]);
