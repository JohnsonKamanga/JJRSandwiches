import Footer from "../HomePage/Footer";
import Logo from "../../Logos/logo-white-font-no-background.svg";
import BgImage from "./image1.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function SignUpPage() {
  const { setIsSignedIn, setCurrentUserToken, setCurrentUserData } =
    useContext(UserContext);
  const baseurl = "http://localhost:8000/api";
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationVariables, setValidationVariables] = useState({
    isEmailValid: true,
    isPasswordsEqual: false,
    isUsernameValid: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayMessages, setDisplayMessages] = useState({
    email: "default",
    username: "default",
    password: "default",
    confirmPassword: "default",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //create user
      const user = await axios.post(`${baseurl}/users`, {
        userEmail: userEmail,
        username: username,
        password: password,
      });

      //log user in
      const token = await axios.post(`${baseurl}/auth/login`, {
        username: username,
        password: password,
      });
      setCurrentUserToken(token);
      setCurrentUserData(user.data);
      setIsSignedIn(true);
      console.log(`Email: ${userEmail}`);
      console.log(`Username: ${username}`);
      console.log(`password: ${password}`);
      console.log("Navigating to the Profile Creation Page");
      navigate("/ProfileCreation");
    } catch (error) {
      console.log(error.message + " : " + error.code);
      console.log("Unable to create user");
    }
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
          <div className="mb-[7%] mt-[3%] sm:my-[2%] xl:my-[1%] p-2 rounded-[18px] w-[90%] lg:w-[50%] h-[15%] sm:h-[15%] md:h-[20%] lg:h-[20%] xl:w-[50%] xl:h-[25%] bg-black bg-opacity-35 flex items-center">
            <NavLink to="/HomePage">
              <img src={Logo} alt="logo" />
            </NavLink>
          </div>

          <div className="text-center text-white">
            <h1 className="mb-[7%] md:mb-[4%] lg:mb-[2%] text-2xl md:text-3xl lg:text-5xl font-bold">
              Welcome to JJRSandwiches!
            </h1>
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded-[18px] w-[80%] md:w-[70%] lg:w-[50%] flex flex-col items-center justify-center text-black">
            <p className="mx-[7%] text-sm lg:text-base text-center text-white">
              Create an account and join us now
            </p>
            <form
              id="SignUp"
              onSubmit={handleSubmit}
              className="flex flex-col justify-center p-2 h-[130%] w-[100%] rounded-[14px] text-sm "
            >
              <div className="flex flex-row h-[20%] lg:h-[60px] items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
                <label
                  htmlFor="user_id"
                  className="w-[120px] font-medium text-white text-end p-2 border-r-[1px]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="user_id"
                  value={userEmail}
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                    /*logic for checkig email comes here*/

                    if (e.target.value === "") {
                      document.getElementById(
                        "email_validation"
                      ).style.opacity = "0";
                    } else if (validationVariables.isEmailValid) {
                      setDisplayMessages({
                        ...displayMessages,
                        email: "Email is valid"
                      });
                      document.getElementById("email_validation").style.color =
                        "green";
                      document.getElementById(
                        "email_validation"
                      ).style.opacity = "1";
                    } else {
                      setDisplayMessages({
                        ...displayMessages,
                        email: "Email is not valid"
                      });
                      document.getElementById("email_validation").style.color =
                        "red";
                      document.getElementById(
                        "email_validation"
                      ).style.opacity = "1";
                    }
                  }}
                  placeholder="Enter your email address"
                  className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div id="email_validation" className=" opacity-0 mb-4">
                {displayMessages.email}
              </div>
              <div className="flex flex-row h-[20%] lg:h-[60px] items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
                <label
                  htmlFor="username"
                  className="w-[120px] font-medium text-white text-end p-2 border-r-[1px]"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    const potentialExistingUser = axios.get(
                      `${baseurl}/users/${e.target.value}`
                    );
                    potentialExistingUser.then((potentialUser) => {
                      if (e.target.value === "") {
                        document.getElementById(
                          "username_validation"
                        ).style.opacity = "0";
                        setValidationVariables({
                          ...validationVariables,
                          isUsernameValid: false,
                        });
                      } else if (Object.keys(potentialUser.data).length === 0) {
                        setDisplayMessages({
                          ...displayMessages,
                          username: "username is valid",
                        });
                        document.getElementById(
                          "username_validation"
                        ).style.color = "green";
                        document.getElementById(
                          "username_validation"
                        ).style.opacity = "1";
                        setValidationVariables({
                          ...validationVariables,
                          isUsernameValid: true,
                        });
                      } else {
                        setDisplayMessages({
                          ...displayMessages,
                          username: "Username already exists",
                        });
                        document.getElementById(
                          "username_validation"
                        ).style.color = "red";
                        document.getElementById(
                          "username_validation"
                        ).style.opacity = "1";
                        setValidationVariables({
                          ...validationVariables,
                          isUsernameValid: false,
                        });
                      }
                    });
                  }}
                  placeholder="Enter your username"
                  className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div id="username_validation" className=" opacity-0 mb-4">
                {displayMessages.username}
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
                    if (confirmPassword === "" && e.target.value === "") {
                      document.getElementById(
                        "password_validation"
                      ).style.opacity = "0";
                      document.getElementById(
                        "password_confirmation"
                      ).style.opacity = "0";
                    }
                      else if(confirmPassword.length > 0 && e.target.value === ""){
                        document.getElementById(
                          "password_validation"
                        ).style.opacity = "0";
                        setDisplayMessages({
                          ...displayMessages,
                          confirmPassword: "passwords must be equal"
                        })
                      }
                    else if (e.target.value.length < 6) {
                      document.getElementById(
                        "password_validation"
                      ).style.color = "red";
                      document.getElementById(
                        "password_validation"
                      ).style.opacity = "1";
                      setDisplayMessages({
                        ...displayMessages,
                        password: "Password should be at least 6 characters",
                      });
                    } else {
                      document.getElementById(
                        "password_validation"
                      ).style.color = "green";
                      document.getElementById(
                        "password_validation"
                      ).style.opacity = "1";
                      setDisplayMessages({
                        ...displayMessages,
                        password: "Password is long enough",
                      });
                    }
                  }}
                  placeholder="Enter your password"
                  className="bg-transparent p-3 lg:p-[18px] font-light placeholder:text-white placeholder:text-opacity-70 text-white transition-all duration-200  hover:bg-white hover:bg-opacity-10  outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div id="password_validation" className=" opacity-0">
                {displayMessages.password}
              </div>
              <div className="flex my-3 text-white font-extralight items-center justify-between"></div>
              <div className="flex flex-row mt-1 items-center h-[20%] lg:h-[60px] bg-white bg-opacity-20 rounded-[18px]">
                <label
                  htmlFor="user_password"
                  className="p-2 w-[120px] font-medium text-white text-end border-r-[1px]"
                >
                  Confirm password
                </label>
                <input
                  id="confirm_user_password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (password === "" && e.target.value === "") {
                      document.getElementById(
                        "password_confirmation"
                      ).style.opacity = "0";
                      document.getElementById(
                        "password_validation"
                      ).style.opacity = "0";
                    } else if (password === e.target.value) {
                      setValidationVariables({
                        ...validationVariables,
                        isPasswordsEqual: true,
                      });
                      setDisplayMessages({
                        ...displayMessages,
                        confirmPassword: "passwords are the same",
                      });

                      document.getElementById(
                        "password_confirmation"
                      ).style.color = "green";
                      document.getElementById(
                        "password_confirmation"
                      ).style.opacity = "1";
                    } else {
                      setValidationVariables({
                        ...validationVariables,
                        isPasswordsEqual: false,
                      });
                      setDisplayMessages({
                        ...displayMessages,
                        confirmPassword: "passwords must be equal",
                      });
                      document.getElementById(
                        "password_confirmation"
                      ).style.color = "red";
                      document.getElementById(
                        "password_confirmation"
                      ).style.opacity = "1";
                    }
                  }}
                  placeholder="Re-enter your password"
                  className="bg-transparent p-3 lg:p-[18px] font-light placeholder:text-white placeholder:text-opacity-70 text-white transition-all duration-200  hover:bg-white hover:bg-opacity-10  outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div id="password_confirmation" className=" opacity-0">
                {displayMessages.confirmPassword}
              </div>
              <div className="flex mb-3 mt-1 text-white font-extralight items-center justify-between"></div>
              <button
                id="signUpButton"
                disabled={
                  !(
                    validationVariables.isPasswordsEqual &&
                    validationVariables.isEmailValid &&
                    validationVariables.isUsernameValid
                  )
                }
                type="submit"
                className={
                  validationVariables.isPasswordsEqual &&
                  validationVariables.isEmailValid &&
                  validationVariables.isUsernameValid
                    ? "bg-black bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
                    : "bg-black bg-opacity-70 opacity-60 p-2 rounded-[18px] font-medium text-white"
                }
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
