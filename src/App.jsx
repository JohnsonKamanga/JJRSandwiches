import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { UserContext } from "./Components/Accounts/UserContext.jsx";
import { useState } from "react";
import useToken from "./Components/Accounts/Tokens.js";

function App() {
  const [currentUserData, setCurrentUserData] = useState({});
  const {token, setToken} = useToken();
  const [isSignedIn, setIsSignedIn] = useState(token ? true: false);
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState(0);

  return (
    <UserContext.Provider
      value={{
        currentUserData,
        setCurrentUserData,
        token,
        userID,
        userName,
        setUserName,
        setUserID,
        setToken,
        isSignedIn,
        setIsSignedIn,
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </UserContext.Provider>
  );
}

export default App;
