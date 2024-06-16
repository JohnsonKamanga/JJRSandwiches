import {createBrowserRouter} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Recipes from "./Components/Recipes/Recipes";
import Ratings from "./Components/Ratings/Ratings";
import Feeback from "./Components/Feedback/Feedback";
import LoginPage from "./Components/Authentication/LoginPage";
import Post from "./Components/Post/Post";
import RecipeInstructions from "./Components/Recipes/RecipeInstructions";

export const router = createBrowserRouter([
    {
        path: "/" ,
        element: <HomePage/>
    },
    {
        path: "/HomePage" ,
        element: <HomePage/>
    },
    {
        path: "/Recipes",
        element: <Recipes/>
    },
    {
        path: "/Ratings",
        element: <Ratings/>
    },
    {
        path: "/Feedback",
        element: <Feeback/>
    },
    {
        path: "/LoginPage",
        element: <LoginPage/>
    },
    {
        path: "/Post",
        element: <Post/>
    },
    {
        path: "/RecipeInstructions",
        element: <RecipeInstructions/>
    }
])