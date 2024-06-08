import {createBrowserRouter} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Recipes from "./Components/Recipes/Recipes";
import Ratings from "./Components/Ratings/Ratings";

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
    }
])