import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { UserContext } from "./Components/Accounts/UserContext.jsx";
import { useState } from "react";

function App() {

  const [currentUserData, setCurrentUserData] = useState({});
  const [currentUserToken, setCurrentUserToken] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <UserContext.Provider value={{currentUserData, setCurrentUserData, currentUserToken, setCurrentUserToken, isSignedIn, setIsSignedIn}} >
    <RouterProvider router={router}>

    </RouterProvider>
    </UserContext.Provider>
  )
}

export default App
