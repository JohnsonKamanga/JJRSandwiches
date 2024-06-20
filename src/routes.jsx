import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Recipes from "./Components/Recipes/Recipes";
import AboutUs from "./Components/AboutUs/AboutUs";
import FAQ from "./Components/FAQ/FAQ";
import LoginPage from "./Components/Accounts/LoginPage";
import UploadPost from "./Components/Post/UploadPost";
import RecipeInstructions from "./Components/Recipes/RecipeInstructions";
import Communities from "./Components/Communities/Communities";
import AccountPage from "./Components/Accounts/AccountPage";
import CommunityPage from "./Components/Communities/CommunityPage";
import ViewPost from "./Components/Post/ViewPost";
import ViewAccount from "./Components/Accounts/ViewAccount";
import SignUpPage from "./Components/Accounts/SignUpPage";

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
    path: "/RecipeInstructions",
    element: <RecipeInstructions />,
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
    path: "/AccountPage",
    element: <AccountPage />,
  },{
    path: "/CommunityPage",
    element: <CommunityPage/>
  },
  {
    path: "/ViewPost",
    element: <ViewPost/>
  },
  {
    path: "/ViewAccount",
    element: <ViewAccount/>
  },
  {
    path: "/SignUpPage",
    element: <SignUpPage/>
  }
]);
