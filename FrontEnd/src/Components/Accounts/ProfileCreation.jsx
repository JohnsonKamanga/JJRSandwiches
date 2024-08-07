import Footer from "../HomePage/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import BgImage from "./image4.jpg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import NavBar from "../HomePage/NavBar";
import axios from "axios";
import { UserContext } from "./UserContext";
import { baseurl } from "../../routes";

export default function ProfileCreation() {
  const { token, setUserID, setUserName } = useContext(UserContext);
  const [decodedToken, setDecodedToken] = useState();
  const headers = {
    Authorization: `Bearer ${token?.data?.access_token}`,
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const update = axios.putForm(
      `${baseurl}/users/${decodedToken?.sub}`,
      {
        firstName: firstName,
        lastName: lastName,
        location: location,
        dob: dob,
        bio: bio,
        profilePicture: profilePicture
      },
      {
        headers: headers,
      }
    );

    update
      .then(() => {
        setUserID(decodedToken.sub);
        setUserName(decodedToken.username);
        console.log("Navigating to the homepage");
        setLoading(false);
        navigate("/HomePage");
      })
      .catch((error) => {
        console.error(error)
        document.getElementById("loadingScreen").style.color = 'red';
        setErrorMessage(`An error ocurred creating your profile./nError ${error.code} : ${error.message}/nPlease refresh the page`);
        setError(true);
      });
  };

  const decodeToken = () => {
    if(loading)
    document.getElementById("loadingScreen").style.color = 'black';
    axios
      .post(`${baseurl}/auth/decode`, {
        access_token: token?.data?.access_token,
      })
      .then((dToken) => {
        if(!token)
          throw new TypeError(`Null value error: User token cannot be null` );
        setDecodedToken(dToken.data);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(true);
        document.getElementById("loadingScreen").style.color = 'red';
        setErrorMessage("An error ocurred, please refresh the page");
        setError(true);
      });
  };

  useEffect(() => {
    decodeToken();
    return () => {};
  }, []);

  if (loading) {
    return (
      <div className="min-h-full h-screen">
        <NavBar />
        <div
          className="flex flex-col min-h-full h-screen bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${BgImage})`,
          }}
        >
          <div
            className="flex flex-col text-white p-1 min-h-full h-screen items-center justify-center backdrop-blur-[6px] bg-black bg-opacity-35"
            id="loadingScreen"
          >
            <div className="bg-black text-white bg-opacity-50 p-4 w-[300px] h-[300px] sm:w-[400px] rounded-[18px] flex flex-col items-center justify-center">
            {error ? (
              errorMessage
            ) : (
              <div className="flex flex-col items-center justify-center">
                <FontAwesomeIcon
                  className="text-3xl animate-spin"
                  icon={faSpinner}
                />
                <div className="text-xl">Loading...</div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full h-screen">
      <NavBar />
      <div
        className="flex flex-col h-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      >
        <div className="flex flex-col p-1 h-full items-center backdrop-blur-[6px] bg-black bg-opacity-35">
          <div className="text-center text-white mt-[2%] lg:mt-0 mb-[1%]">
            <h1 className="p-2 text-2xl md:text-4xl font-bold">
              Let us know more about you
            </h1>
            <p className="mx-[7%] mb-[3%] mt-[1.5%] text-sm lg:text-base text-center text-white">
              Please fill in the following fields{" "}
            </p>
          </div>
          <div className="bg-black bg-opacity-50 p-4 sm:h-[80%] w-[350px] sm:w-[400px] md:w-[450px] lg:w-[35%] rounded-[18px] flex flex-col items-center justify-center text-black">
            <form
              id="profileCreation"
              onSubmit={handleSubmit}
              className="flex flex-col justify-center p-2  rounded-[14px] text-sm  "
            >
              <div className="flex flex-col items-center justify-center mb-[3%] ">
                <div className="h-[120px] lg:h-[150px] w-[120px] lg:w-[150px] flex flex-col justify-center bg-white bg-opacity-20 rounded-full p-2">
                  <label
                    id="pfp_label"
                    htmlFor="profilePicture"
                    className="flex flex-col justify-center hover:cursor-pointer font-thin text-opacity-70 text-white"
                  >
                    <img
                      id="pfp"
                      alt="profile picture"
                      className=" items-center rounded-full hidden"
                    />
                    <FontAwesomeIcon
                      id="addPicture"
                      icon={faPlus}
                      className="block"
                    />
                    <p id="text_addPicture" className="block text-center">
                      add picture
                    </p>
                  </label>

                  <input
                    name="profilePicture"
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    src={profilePicture}
                    onChange={(e) => {
                      document.getElementById("addPicture").style.display =
                        "none";
                      document.getElementById("text_addPicture").style.display =
                        "none";

                      const preview = document.getElementById("pfp");
                      preview.style.display = "block";
                      const reader = new FileReader();
                      reader.onload = () => {
                        preview.src = reader.result;
                      };
                      reader.readAsDataURL(e.target.files[0]);
                      setProfilePicture(e.target.files[0]);
                    }}
                    className="hidden"
                  ></input>
                </div>
                <div className="flex flex-row p-1 items-center text-center"></div>
              </div>
              <div className="flex flex-row mb-[2%] items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
                <label
                  htmlFor="first_name"
                  className="w-[120px] font-medium text-white text-end p-2 border-r-[1px]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  autoComplete="on"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="First name"
                  className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div className="flex flex-row mb-[2%] items-center bg-white bg-opacity-20 rounded-[18px]">
                <label
                  htmlFor="last_name"
                  className="p-2 w-[120px] font-medium text-white text-end border-r-[1px]"
                >
                  Last name
                </label>
                <input
                  id="last_name"
                  type="text"
                  autoComplete="on"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Last name"
                  className="bg-transparent p-3  font-light placeholder:text-white placeholder:text-opacity-70 text-white transition-all duration-200  hover:bg-white hover:bg-opacity-10  outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div className="flex flex-row mb-[2%] items-center  bg-white bg-opacity-20 rounded-[18px]">
                <label
                  htmlFor="location"
                  className="p-2 w-[120px] font-medium text-white text-end border-r-[1px]"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  autoComplete="on"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  placeholder="Location"
                  className="bg-transparent p-3 font-light placeholder:text-white placeholder:text-opacity-70 text-white transition-all duration-200  hover:bg-white hover:bg-opacity-10  outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div className="flex flex-row mb-[2%] items-center bg-white bg-opacity-20 rounded-[18px]">
                <label
                  htmlFor="dob"
                  className="p-2 w-[120px] font-medium text-white text-end border-r-[1px]"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  autoComplete="on"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  className="bg-transparent p-3 font-light placeholder:text-white placeholder:text-opacity-70 text-white transition-all duration-200  hover:bg-white hover:bg-opacity-10  outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>
              <div className="flex flex-row mb-[2%] items-center bg-white bg-opacity-20 rounded-[18px]">
                <label
                  htmlFor="favorite_sandwich"
                  className="p-2 w-[120px] font-medium text-white text-end border-r-[1px]"
                >
                  Bio
                </label>
                <input
                  id="favorite_sandwich"
                  type="text"
                  autoComplete="on"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  placeholder="Tell us something about you..."
                  className="bg-transparent p-3 font-light placeholder:text-white   placeholder:text-opacity-70 text-white transition-all duration-200  hover:bg-white hover:bg-opacity-10  outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                ></input>
              </div>

              <button
                type="submit"
                className="bg-black bg-opacity-70 mb-[2%] hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
