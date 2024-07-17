import Footer from "../HomePage/Footer";
import Logo from "../../Logos/logo-white-font-no-background.svg";
import BgImage from "./image1.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { baseurl } from "../../routes";

export default function Security() {
  const headers = {
    'Authorization' : `Bearer ${token?.data.access_token}`
  }
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationVariables, setValidationVariables] = useState({
    isEmailValid: true,
    isPasswordsEqual: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayMessages, setDisplayMessages] = useState({
    email: "default",
    password: "default",
    confirmPassword: "default",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${baseurl}/users/${decodedToken.sub}`,{
      userEmail: userEmail,
      password: password
    }, {
      headers: headers,
    }) 
    console.log(`Username/Email: ${userEmail}`);
    console.log(`password: ${password}`);
    console.log("Navigating to the Profile Creation Page");
  };

  return (
    <div>
      <div
        className="flex flex-col min-h-full h-[90vh] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      >
        <div className="flex flex-col p-5 items-center min-h-full h-[85vh] backdrop-blur-[6px] bg-black bg-opacity-35">

          <div className="text-center text-white">
            <h1 className="mb-[7%] md:mb-[4%] lg:mb-[2%] text-4xl md:text-3xl lg:text-5xl font-bold">
              Update Your Security Info
            </h1>
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded-[18px] w-[80%] md:w-[70%] lg:w-[50%] flex flex-col items-center justify-center text-black">
            <p className="mx-[7%] text-sm lg:text-base text-center text-white">
              Update your security and improve protection of your data
            </p>
            <form
              id="login"
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
                        email: "Email is valid",
                        password: displayMessages.password,
                        confirmPassword: displayMessages.confirmPassword,
                      });
                      document.getElementById("email_validation").style.color =
                        "green";
                      document.getElementById(
                        "email_validation"
                      ).style.opacity = "1";
                    } else {
                      setDisplayMessages({
                        email: "Email is not valid",
                        password: displayMessages.password,
                        confirmPassword: displayMessages.confirmPassword,
                      });
                      document.getElementById("email_validation").style.color =
                        "red";
                      document.getElementById(
                        "email_validation"
                      ).style.opacity = "1";
                    }
                  }}
                  placeholder="Email"
                  className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div id="email_validation" className=" opacity-0 mb-4">
                {displayMessages.email}
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
                    } else if (e.target.value.length < 6) {
                      document.getElementById(
                        "password_validation"
                      ).style.color = "red";
                      document.getElementById(
                        "password_validation"
                      ).style.opacity = "1";
                      setDisplayMessages({
                        password: "Password should be at least 6 characters",
                        email: displayMessages.email,
                        confirmPassword: displayMessages.confirmPassword,
                      });
                    } else {
                      document.getElementById(
                        "password_validation"
                      ).style.color = "green";
                      document.getElementById(
                        "password_validation"
                      ).style.opacity = "1";
                      setDisplayMessages({
                        password: "Password is long enough",
                        email: displayMessages.email,
                        confirmPassword: displayMessages.confirmPassword,
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
                        isEmailValid: validationVariables.isEmailValid,
                        isPasswordsEqual: true,
                      });
                      setDisplayMessages({
                        email: displayMessages.email,
                        password: displayMessages.password,
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
                        isEmailValid: validationVariables.isEmailValid,
                        isPasswordsEqual: false,
                      });
                      setDisplayMessages({
                        email: displayMessages.email,
                        password: displayMessages.password,
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
                    validationVariables.isEmailValid
                  )
                }
                type="submit"
                className={
                  validationVariables.isPasswordsEqual &&
                  validationVariables.isEmailValid
                    ? "bg-black bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
                    : "bg-black bg-opacity-70 opacity-60 p-2 rounded-[18px] font-medium text-white"
                }
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
