import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { baseurl } from "../../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faMinus,
  faMinusCircle,
  faPen,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export default function Security() {
  const { token } = useContext(UserContext);
  const headers = {
    Authorization: `Bearer ${token?.data.access_token}`,
  };
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState();
  const [decodedToken, setDecodedToken] = useState();
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [validationVariables, setValidationVariables] = useState({
    isEmailValid: false,
    isPasswordsEqual: false,
    isUsernameValid: false
  });
  const [display, setDisplay] = useState(
    <div className=" p-2 w-[200px] h-[200px] rounded-[18px] flex flex-col items-center justify-center">
      <div className="text-white flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl" />
        <div>Loading...</div>
      </div>
    </div>
  );
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayMessages, setDisplayMessages] = useState({
    email: "default",
    password: "default",
    confirmPassword: "default",
    username: "default"
  });
  const handleShowPassword = () => {
    if (!updatePassword) {
      document.getElementById("passwordOptions").style.display = "flex";
    } else {
      document.getElementById("passwordOptions").style.display = "none";
      setPassword();
      setConfirmPassword();
    }
    setUpdatePassword(!updatePassword);
  };
  const [updateUsername, setUpdateUsername] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.put(
      `${baseurl}/users/${decodedToken.sub}`,
      {
        userEmail,
        password,
        username
      },
      {
        headers: headers,
      }
    ).then((res)=>{
      
      setOriginalEmail(userEmail ? userEmail : originalEmail );
      setOriginalUsername(username ? username : originalUsername);
    setUserEmail();
    setUpdateEmail(false);
    setUsername();
    setUpdateUsername(false);
    setPassword();
    setUpdatePassword(false);
    setConfirmPassword();
    setLoading(false);
    
    })
    .catch((err)=>{
      console.error(err);
      setDisplay(
        <div className="bg-black bg-opacity-50 text-[#ff0000] p-4 w-[300px] h-[300px] sm:w-[400px] rounded-[18px] flex flex-col items-center justify-center">
          <div>{`Unable to update user.\n${err.message} : ${err.code}`}</div>
        </div>
      );
    })
  };

  const initialize = () => {
    axios
      .post(`${baseurl}/auth/decode`, {
        access_token: token?.data?.access_token,
      })
      .then((dToken) => {
        setDecodedToken(dToken.data);
        axios
          .get(`${baseurl}/users/${dToken?.data?.username}`)
          .then((userData) => {
            setOriginalEmail(userData.data.userEmail);
            setOriginalUsername(userData.data.username);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setDisplay(
              <div className="bg-black bg-opacity-50 text-[#ff0000] p-4 w-[300px] h-[300px] sm:w-[400px] rounded-[18px] flex flex-col items-center justify-center">
                <div>{`Unable to fetch user data.\n${err.message} : ${err.code}`}</div>
              </div>
            );
          });
      })
      .catch((err) => {
        console.error(err);
        setDisplay(
          <div className="bg-black bg-opacity-50 text-[#ff0000] p-4 w-[300px] h-[300px] sm:w-[400px] rounded-[18px] flex flex-col items-center justify-center">
            <div>{`Unable to fetch user data.\n${err.message} : ${err.code}`}</div>
          </div>
        );
      });
  };

  //empty dependancy list means useEfect is rendered once
  useEffect(() => {
    initialize();
  }, []);

  return (
    <div>
      <div className="flex flex-col min-h-full h-[90vh]">
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
          {loading?

            <div
            className="flex flex-col items-center justify-center p-2 h-fit w-[100%] rounded-[14px] text-sm "
            >
            {display}
            </div>
            :
            <form
              id="login"
              onSubmit={handleSubmit}
              className="flex flex-col justify-center p-2 h-fit w-[100%] rounded-[14px] text-sm "
            >
              <div className=" border-b-[1px] border-white border-opacity-65">
                <div
                  className="flex justify-between hover:cursor-pointer hover:text-[#f87058] transition-all p-2 mb-2 font-medium text-white "
                  onClick={() => {
                    const emailOptions =
                      document.getElementById("emailOptions");
                    if (emailOptions) {
                      if (
                        window.getComputedStyle(emailOptions).display === "none"
                      ) {
                        emailOptions.style.display = "flex";
                      } else {
                        setUserEmail();
                        emailOptions.style.display = "none";
                      }
                      setUpdateEmail(!updateEmail);
                    }
                  }}
                >
                  <div>Update Email</div>
                  <FontAwesomeIcon icon={updateEmail? faMinus : faCaretDown} className="" />
                </div>
                <div id="emailOptions" className="hidden flex-col">
                  
                  <div className="flex flex-row h-[45px] lg:h-[60px] mb-9 items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
                    <div
                      className="w-[160px] flex justify-end font-medium text-white text-end p-2 border-r-[1px]"
                    >
                      <div>Current Email</div>
                    </div>
                    <div
                      className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                    >
                    {originalEmail}
                    </div>
                  </div>
                  <div className="flex flex-row h-[45px] lg:h-[60px] items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
                    <label
                      htmlFor="user_email"
                      className="w-[160px] flex justify-end font-medium text-white text-end p-2 border-r-[1px]"
                    > 
                      
                      New Email
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                        /*logic for checkig email comes here*/
                        if (e.target.value.match(emailRegex)) {
                          setValidationVariables({
                            ...validationVariables,
                            isEmailValid: true,
                          });
                        } else {
                          setValidationVariables({
                            ...validationVariables,
                            isEmailValid: false,
                          });
                        }
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
                          document.getElementById(
                            "email_validation"
                          ).style.color = "green";
                          document.getElementById(
                            "email_validation"
                          ).style.opacity = "1";
                        } else {
                          setDisplayMessages({
                            email: "Email is not valid",
                            password: displayMessages.password,
                            confirmPassword: displayMessages.confirmPassword,
                          });
                          document.getElementById(
                            "email_validation"
                          ).style.color = "red";
                          document.getElementById(
                            "email_validation"
                          ).style.opacity = "1";
                        }
                      }}
                      placeholder="Email"
                      className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                    ></input>
                  </div>
                  <div id="email_validation" className=" opacity-0 p-2">
                    {displayMessages.email}
                  </div>
                  <div className="flex justify-end mb-1">
                  <button
                  type="submit"
                  disabled={!validationVariables.isEmailValid}
                  className="disabled:hover:cursor-default w-[100px] text-white  p-3 rounded-md transition-all duration-200 bg-black bg-opacity-50 hover:bg-opacity-75 disabled:hover:bg-opacity-50 hover:text-[#f87058] disabled:hover:text-white disabled:text-opacity-30 disabled:hover:text-opacity-30 border-[1px] border-white border-opacity-5 hover:border-opacity-15 disabled:hover:border-opacity-5 "
                  >
                    Update
                  </button>
                  </div>
                </div>
              </div>
              <div className=" border-b-[1px] border-white border-opacity-65">
                <div
                  className="flex justify-between hover:cursor-pointer hover:text-[#f87058] transition-all p-2 mb-2 font-medium text-white "
                  onClick={() => {
                    const usernameOptions =
                      document.getElementById("usernameOptions");
                    if (usernameOptions) {
                      if (
                        window.getComputedStyle(usernameOptions).display === "none"
                      ) {
                        usernameOptions.style.display = "flex";
                      } else {
                        setUsername();
                        usernameOptions.style.display = "none";
                      }
                      setUpdateUserName(!updateUsername);
                    }
                  }}
                >
                  <div>Update Username</div>
                  <FontAwesomeIcon icon={updateUsername? faMinus : faCaretDown} className="" />
                </div>
                <div id="usernameOptions" className="hidden flex-col">
                  
                  <div className="flex flex-row h-[45px] lg:h-[60px] mb-9 items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
                    <div
                      className="w-[160px] flex justify-end font-medium text-white text-end p-2 border-r-[1px]"
                    >
                      <div>Current Username</div>
                    </div>
                    <div
                      className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                    >
                    {originalUsername}
                    </div>
                  </div>
                  <div className="flex flex-row h-[45px] lg:h-[60px] items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
                    <label
                      htmlFor="username"
                      className="w-[160px] flex justify-end font-medium text-white text-end p-2 border-r-[1px]"
                    > 
                      
                      New username
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
                      placeholder="Username"
                      className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                    ></input>
                  </div>
                  <div id="username_validation" className=" opacity-0 p-2">
                    {displayMessages.username}
                  </div>
                  <div className="flex justify-end mb-1">
                  <button
                  type="submit"
                  disabled={!validationVariables.isUsernameValid}
                  className="disabled:hover:cursor-default w-[100px] text-white  p-3 rounded-md transition-all duration-200 bg-black bg-opacity-50 hover:bg-opacity-75 disabled:hover:bg-opacity-50 hover:text-[#f87058] disabled:hover:text-white disabled:text-opacity-30 disabled:hover:text-opacity-30 border-[1px] border-white border-opacity-5 hover:border-opacity-15 disabled:hover:border-opacity-5 "
                  >
                    Update
                  </button>
                  </div>
                </div>
              </div>
              <div
                className="mb-4 hover:cursor-pointer transition-all hover:text-[#f87058] duration-200 p-2 rounded-[18px] font-medium text-white"
                onClick={handleShowPassword}
              >
                <div className="flex items-center justify-between">
                  <div>Update Password</div>
                  <div>
                      <FontAwesomeIcon icon={updatePassword ?faMinus : faCaretDown} />
                  </div>
                </div>
              </div>
              <div className="hidden flex-col" id="passwordOptions">
              <div
                id="newPassword"
                className="flex flex-row items-center h-[45px] lg:h-[60px] bg-white bg-opacity-20 rounded-[18px]"
              >
                <label
                  htmlFor="user_password"
                  className="p-2 w-[160px] font-medium text-white text-end border-r-[1px]"
                >
                  New Password
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
                  disabled={!updatePassword}
                  placeholder="Enter your password"
                  className="bg-transparent p-3 lg:p-[18px] font-light placeholder:text-white placeholder:text-opacity-70 text-white transition-all duration-200  hover:bg-white hover:bg-opacity-10  outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div id="password_validation" className="p-2 opacity-0">
                {displayMessages.password}
              </div>
              <div
                id="confirmNewPassword"
                className="flex flex-row mt-1 items-center h-[45px] lg:h-[60px] bg-white bg-opacity-20 rounded-[18px]"
              >
                <label
                  htmlFor="confirm_user_password"
                  className="p-2 w-[160px] font-medium text-white text-end border-r-[1px]"
                >
                  Confirm password
                </label>
                <input
                  id="confirm_user_password"
                  type="password"
                  value={confirmPassword}
                  disabled={!updatePassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (password === "" && e.target.value === "") {
                      document.getElementById(
                        "password_confirmation"
                      ).style.opacity = "0";
                      document.getElementById(
                        "password_validation"
                      ).style.opacity = "0";
                    } else if (
                      password === e.target.value &&
                      password.length >= 6
                    ) {
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
              <div id="password_confirmation" className="opacity-0 p-2">
                {displayMessages.confirmPassword}
              </div>
              <div className="flex justify-end">
              <button
              type="submit"
              disabled={!validationVariables.isPasswordsEqual}
              className="disabled:hover:cursor-default w-[100px] text-white  p-3 rounded-md transition-all duration-200 bg-black bg-opacity-50 hover:bg-opacity-75 disabled:hover:bg-opacity-50 hover:text-[#f87058] disabled:hover:text-white disabled:text-opacity-30 disabled:hover:text-opacity-30 border-[1px] border-white border-opacity-5 hover:border-opacity-15 disabled:hover:border-opacity-5 "
              >
                update
              </button>
              </div>
              </div>
             
            </form>
          }
          </div>
        </div>
      </div>
    </div>
  );
}
