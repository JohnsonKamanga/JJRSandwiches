import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import BgImage from "./image4.jpg";
import { useContext, useEffect, useState } from "react";
import Logo from "../../Logos/logo-black.png";
import axios from "axios";
import { wait } from "../../utilities";
import { UserContext } from "./UserContext";
import { baseurl } from "../../routes";

export default function Bio() {
  const { token } = useContext(UserContext);
  const headers = {
    Authorization: `Bearer ${token?.data.access_token}`,
  };
  const [user, setUser] = useState({});
  const [rendering, setRendering] = useState(true);
  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [bio, setBio] = useState(user?.bio);
  const [location, setLocation] = useState(user?.location);
  const [dob, setDob] = useState(user?.dob);
  const [editable, setEditable] = useState(false);
  const [profilePicture, setProfilePicture] = useState(Logo);
  const [decodedToken, setDecodedToken] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditable(!editable);
    document.getElementById("submit").style.display = "none";
    document.getElementById("loading").style.display = "flex";
    console.log("Submitting info...");
    axios
      .put(
        `${baseurl}/users/${decodedToken.sub}`,
        {
          firstName: firstName,
          lastName: lastName,
          location: location,
          dob: dob,
          bio: bio,
        },
        {
          headers: headers,
        }
      )
      .then(() => {
        setUser({
          firstName: firstName,
          lastName: lastName,
          location: location,
          dob: dob,
          bio: bio,
        });
        console.log("User info updated successfully....");
        document.getElementById("loading").style.display = "none";
        document.getElementById("edit").style.display = "block";
      })
      .catch((error) => {
        console.error(error);
        console.log("Unable to update user data...");
        document.getElementById("error_message").style.display = "block";
        document.getElementById("error_message").style.color = "red";
        document.getElementById("loading").style.display = "none";
        document.getElementById("submit").style.display = "block";
        setEditable(true);
      });
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
            setUser(userData.data);
            setFirstName(userData?.data?.firstName);
            setLastName(userData?.data?.lastName);
            setBio(userData?.data?.bio);
            setDob(userData?.data?.dob);
            setLocation(userData?.data?.location);
            setRendering(false);
            setError(false);
          });
      })
      .catch((err) => {
        console.error(err);
        setRendering(false);
        setError(true);
      });
  };

  //empty dependancy list means useEfect is rendered once
  useEffect(() => {
    initialize();
    return () => {
      console.log("data fetching completed");
    };
  }, []);

  if (rendering) {
    return (
      <div>
        <div
          className="flex flex-col h-[560px] bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${BgImage})`,
          }}
        >
          <div className="flex flex-col text-black p-1 h-[560px] items-center justify-center backdrop-blur-[6px] bg-black bg-opacity-35">
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon
                className="text-7xl animate-spin"
                icon={faSpinner}
              />
              <div className="text-xl">loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div
          className="flex flex-col h-[560px] bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${BgImage})`,
          }}
        >
          <div className="flex flex-col text-black p-1 h-[560px] items-center justify-center backdrop-blur-[6px] bg-black bg-opacity-35">
            <div className="flex flex-col items-center justify-center">
              <div className="text-xl text-red-500">Error encountered</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex flex-col h-[560px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      >
        <div className="flex flex-col p-1 h-[560px] items-center backdrop-blur-[6px] bg-black bg-opacity-35">
          <div className="text-center text-white mt-[2%] lg:mt-0 mb-[1%]">
            <h1 className="p-2 text-2xl md:text-4xl font-bold">
              Update Your Account Info
            </h1>
            <p className="mx-[7%] mb-[3%] mt-[1.5%] text-sm lg:text-base text-center text-white">
              Feel free update any of the following fields{" "}
            </p>
          </div>
          <div className="bg-black bg-opacity-50 p-4 h-[75%] w-[80%] sm:w-[88%] md:w-[60%] lg:w-[55%] rounded-[18px] flex flex-col items-center justify-center text-black">
            <form
              id="profileCreation"
              onSubmit={handleSubmit}
              className="flex flex-row p-2  rounded-[14px] text-sm  "
            >
              <div className="flex flex-col mb-[3%] ">
                <div className="h-[120px] lg:h-[150px] xl:h-[200px] w-[120px] lg:w-[150px] xl:w-[200px] flex flex-col justify-center bg-white bg-opacity-20 rounded-full p-2">
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
                    id="profilePicture"
                    type="file"
                    disabled={!editable}
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
                      setProfilePicture(preview.src);
                    }}
                    className="hidden"
                  ></input>
                </div>
                <div className="flex flex-row p-1 items-center text-center"></div>
              </div>
              <div className="p-2 pt-5 rounded-[18px] ml-2 bg-black bg-opacity-60 flex flex-col items-center">
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
                    disabled={!editable}
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
                    disabled={!editable}
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
                    disabled={!editable}
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
                    disabled={!editable}
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
                    disabled={!editable}
                    autoComplete="on"
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                    placeholder="Tell us something about you..."
                    className="bg-transparent p-3 font-light placeholder:text-white   placeholder:text-opacity-70 text-white transition-all duration-200  hover:bg-white hover:bg-opacity-10  outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
                  ></input>
                </div>
                <div className="flex flex-row justify-between hover:cursor-pointer">
                  <div
                    id="edit"
                    onClick={(e) => {
                      setEditable(!editable);
                      document.getElementById("edit").style.display = "none";
                      document.getElementById("submit").style.display = "block";
                    }}
                    className="bg-black block bg-opacity-70 mb-[2%] hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
                  >
                    edit
                  </div>
                  <button
                    id="submit"
                    disabled={!editable}
                    type="submit"
                    className="bg-black hidden bg-opacity-70 mb-[2%] hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
                  >
                    Update
                  </button>
                  <div
                    id="loading"
                    className="justify-center hidden items-center bg-black bg-opacity-70 mb-[2%] w-16 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
                  >
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className=" animate-spin"
                    />
                  </div>
                </div>
                <div id="error_message" className="hidden">
                  unable to update user info
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
