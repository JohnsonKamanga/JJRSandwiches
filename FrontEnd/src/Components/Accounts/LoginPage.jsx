import Footer from "../HomePage/Footer";
import Logo from "../../Logos/logo-white-font-no-background.svg";
import BgImage from "./sandwich-1768019_1920.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { baseurl } from "../../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const {setCurrentUserData,setUserID, setUserName, token, setToken, setIsSignedIn} = useContext(UserContext);
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = axios.post(`${baseurl}/auth/login`,{username: userNameOrEmail, password: password});

    token.then(async (tokenData)=>{
    setCurrentUserData((await axios.get(`${baseurl}/users/${userNameOrEmail}`)).data);
    setUserID((await axios.get(`${baseurl}/users/${userNameOrEmail}`)).data.id);
    setUserName((await axios.get(`${baseurl}/users/${userNameOrEmail}`)).data.username);
    setToken(tokenData);
    setIsSignedIn(true);
    setLoading(false);
    navigate("/HomePage");
    }
    )
    .catch((error)=>{
      console.error(error);
      const err = document.getElementById("errMsg");
      setErrorMessage("incorrect password or username");
      err.style.display = "flex";
      err.style.color = "red";
      setLoading(false);
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
          <div className="mb-[7%] mt-[3%] sm:my-[5%] md:my-[30px] lg:my-[2%] xl:my-[1%] p-2 rounded-[18px] w-[90%] md:w-[780px] lg:w-[90%] h-[15%] sm:h-[15%] md:h-[200px] lg:h-[20%] xl:w-[70%] xl:h-[25%] bg-black bg-opacity-35 flex items-center">
            <NavLink to="/HomePage">
              <img src={Logo} alt="logo" />
            </NavLink>
          </div>

          <div className="text-center text-white">
            <h1 className="mb-[7%] lg:mb-[2%] text-2xl md:text-4xl lg:text-5xl font-bold">
              Welcome back to JJRSandwiches!
            </h1>
          </div>
          <div className="bg-black bg-opacity-50 p-4 w-[300px] sm:w-[400px] rounded-[18px] flex flex-col items-center justify-center text-black">
            <p className="mx-[7%] text-xs sm:text-sm lg:text-base text-center text-white">
              Please log in to access your account and join our community of
              sandwich enthusiasts{" "}
            </p>
            <form
              id="login"
              onSubmit={handleSubmit}
              className="flex flex-col  autofill:bg-transparent items-center justify-center p-2 rounded-[14px] text-xs sm:text-sm lg:text-base "
            >
              <div className="flex flex-row sm:w-[350px] h-[50px] mb-3 sm:mb-4 items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
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
                  className="bg-transparent autofill:bg-transparent text-white h-full placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div className="flex flex-col h-fit sm:w-[350px]  rounded-[18px]">
              <div className="flex flex-row h-[50px] items-center bg-white bg-opacity-20 rounded-[18px]">
                <label
                  htmlFor="user_password"
                  className="p-2 w-[120px] font-medium text-white text-end border-r-[1px]"
                >
                  Password
                </label>
                <input
                  id="hidden_user_password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter your password"
                  className="block bg-transparent h-full p-3 lg:p-[18px] font-light placeholder:text-white placeholder:text-opacity-70 text-white transition-all duration-200 hover:bg-white hover:bg-opacity-10  outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
                 <input
                  id="displayed_user_password"
                  type="text"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter your password"
                  className="hidden bg-transparent h-full p-3 lg:p-[18px] font-light placeholder:text-white placeholder:text-opacity-70 text-white transition-all duration-200  hover:bg-white hover:bg-opacity-10  outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input> 
              </div>
              <div className="flex items-center w-[125px] sm:w-[150px] p-2  justify-end text-white font-extralight">
                  <label htmlFor="show_password" className="mr-2 transition-all hover:cursor-pointer hover:text-[#f87058] ">
                    Show password
                  </label>
                  <input
                    id="show_password"
                    type="checkbox"
                    onClick={() => {
                      const hidden_password = document.getElementById("hidden_user_password");
                      const displayed_password = document.getElementById("displayed_user_password")
                      if(!showPassword){
                        hidden_password.style.display = "none";
                        displayed_password.style.display = "block";

                      }
                      else{
                        hidden_password.style.display = "block";
                        displayed_password.style.display = "none";
                      }
                      setShowPassword(!showPassword);
                    }}
                    className="accent-[#f87058]"
                  ></input>
                </div>
              </div>
              <div id="errMsg" className="hidden justify-start w-full ps-3 mt-1">{errorMessage}</div>
              <div className="flex w-full sm:w-[350px] text-white font-extralight items-center justify-between">
                <div className="flex justify-end p-2 w-[125px] sm:w-[150px] transition-all">
                  <label htmlFor="remember_me" className="hover:text-[#f87058] mr-2 hover:cursor-pointer">
                    Remember me?
                  </label>
                  <input
                  className="accent-[#f87058]"
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
                  "bg-black bg-opacity-50 p-2 w-full rounded-[18px] font-medium text-white"
                  :
                  "bg-black bg-opacity-70 hover:text-[#f87058] w-full hover:bg-opacity-90 transition-all duration-200 p-2  rounded-[18px] font-medium text-white"
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
        {loading && <div className="z-5 fixed bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center  top-0 left-0 h-full w-full">
          <div className="bg-black bg-opacity-50 p-4 w-[300px] h-[300px] sm:w-[400px] rounded-[18px] flex flex-col items-center justify-center text-black">
            <div className="text-white flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl"/>
              <div>
                Loading...
              </div>
            </div>
            </div>
          </div>}
      </div>
      <Footer />
    </div>
  );
}
