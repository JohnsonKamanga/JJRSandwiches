import Footer from "../HomePage/Footer";
import Logo from "../../Logos/logo-white-font-no-background.svg";
import BgImage from "./sandwich-1768019_1920.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function LoginPage() {
  const baseurl = "http://localhost:8000/api";
  const {setCurrentUserData, setIsSignedIn} = useContext(UserContext);
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = axios.post(`${baseurl}/auth/login`,{username: userNameOrEmail, password: password});

    token.then((tokenData)=>{
    console.log(`Username/Email: ${userNameOrEmail}`);
    console.log(`password: ${password}`);
    console.log("Navigating to the homepage");
    setCurrentUserData(tokenData.data);
    setIsSignedIn(true);
    navigate("/HomePage");
    }
    )
    .catch((error)=>{
      const message = error.message + " : " + error.statusCode;
      console.log(message);
      const err = document.getElementById("errMsg");
      setErrorMessage("incorrect password or username");
      err.style.display = "block";
      err.style.color = "red";
    
    })
    
  };
  return (
    <div>
      <div
        className="flex flex-col min-h-full h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      >
        <div className="flex flex-col p-5 min-h-full h-screen items-center backdrop-blur-[6px] bg-black bg-opacity-35">
          <div className="mb-[7%] mt-[3%] sm:my-[5%] lg:my-[2%] xl:my-[1%] p-2 rounded-[18px] w-[90%] h-[15%] sm:h-[15%] md:h-[20%] lg:h-[20%] xl:w-[70%] xl:h-[25%] bg-black bg-opacity-35 flex items-center">
            <NavLink to="/HomePage">
              <img src={Logo} alt="logo" />
            </NavLink>
          </div>

          <div className="text-center text-white">
            <h1 className="mb-[7%] lg:mb-[2%] text-2xl md:text-4xl lg:text-5xl font-bold">
              Welcome back to JJRSandwiches!
            </h1>
          </div>
          <div className="bg-black bg-opacity-50 p-4 w-[70%] md:w-[50%] lg:w-[40%] rounded-[18px] flex flex-col items-center justify-center text-black">
            <p className="mx-[7%] text-sm lg:text-base text-center text-white">
              Please log in to access your account and join our community of
              sandwich enthusiasts{" "}
            </p>
            <form
              id="login"
              onSubmit={handleSubmit}
              className="flex flex-col justify-center p-2 h-[130%] w-[100%] rounded-[14px] text-sm lg:text-base "
            >
              <div className="flex flex-row mb-9 h-[20%] lg:h-[60px] items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
                <label
                  htmlFor="user_id"
                  className="w-[120px] font-medium text-white text-end p-2 border-r-[1px]"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="user_id"
                  value={userNameOrEmail}
                  onChange={(e) => {
                    setUserNameOrEmail(e.target.value);
                  }}
                  placeholder="Enter your username"
                  className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div className="flex flex-row items-center h-[20%] lg:h-[60px] bg-white bg-opacity-20 rounded-[18px]">
                <label
                  htmlFor="user_password"
                  className="p-2 w-[120px] font-medium text-white text-end border-r-[1px]"
                >
                  Password
                </label>
                <input
                  id="user_password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter your password"
                  className="bg-transparent p-3 lg:p-[18px] font-light placeholder:text-white placeholder:text-opacity-70 text-white transition-all duration-200  hover:bg-white hover:bg-opacity-10  outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div id="errMsg" className="hidden mt-1">{errorMessage}</div>
              <div className="flex my-2 text-white font-extralight items-center justify-between">
                <div className="flex my-3 items-center justify-center hover:text-[#f87058] transition-all">
                  <label htmlFor="remember_me" className="mr-2">
                    Remember me?
                  </label>
                  <input
                    id="remember_me"
                    type="checkbox"
                    value={rememberMe}
                    onClick={() => {
                      setRememberMe(!rememberMe);
                    }}
                  ></input>
                </div>
                <div>
                  <NavLink
                    to="/AccountPage"
                    className="hover:text-[#f87058] transition-all"
                  >
                    Forgot Password?
                  </NavLink>
                </div>
              </div>
              <button
                type="submit"
                disabled = {userNameOrEmail === "" && password === ""}
                className={
                  userNameOrEmail === "" || password === "" ? 
                  "bg-black bg-opacity-50 p-2 rounded-[18px] font-medium text-white"
                  :
                  "bg-black bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
                }
              >
                Login
              </button>
            </form>
          </div>
          <div className="text-white font-thin p-1">
            Don't have an account?
            <NavLink to="/SignUpPage" className="transition-all font-normal hover:text-[#f87058] border-b-[1px] border-white">Sign Up now</NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
