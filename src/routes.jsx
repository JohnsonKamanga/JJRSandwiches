import {createBrowserRouter} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";

export const router = createBrowserRouter([
    {
        path: "/" ,
        element: <HomePage/>
    },
    {
        path: "/HomePage/HomePage" ,
        element: <HomePage/>
    }
])