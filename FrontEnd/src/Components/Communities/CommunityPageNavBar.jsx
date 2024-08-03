import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faEllipsisV,
  faSearch,
  faSpinner,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { wait } from "../../utilities";
import axios from "axios";
import { UserContext } from "../Accounts/UserContext";
import { baseurl } from "../../routes";

export default function CommunityPageNavBar(props) {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const community = props?.community;
  const date = new Date(community.createdAt).toLocaleDateString();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    navigate(
      `/communities/CommunityPage/${community.id}/search?query=${searchQuery}`
    );
    setLoading(false);
  };
  const addUser = (e) => {
    axios
      .post(`${baseurl}/auth/decode`, { access_token: token.data.access_token })
      .then(async (decodedToken) => {
        await axios.put(`${baseurl}/communities/members/${community.id}`, {
          userid: decodedToken?.data?.sub,
          username: decodedToken?.data?.username,
        });
        console.log("User added successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getImage = (community) => {
    axios
      .get(`${baseurl}/communities/community-pictures/${community.id}`, {
        responseType: "blob",
      })
      .then((pic) => {
       const element = document.getElementById(`${community.id}`);
       if(element){
        element.src = URL.createObjectURL(
          pic.data
        );
       }
      })
      .catch((err) => console.error(err));
  };

  if(loading){
    return(
      <div className="z-30 absolute backdrop-blur-xl text-white top-0 left-0 h-full w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-black bg-opacity-35 rounded-lg">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl"/>
        <div className="text-xl font-extralight">Searching...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex-col items-center justify-center relative">
      <div className="flex flex-row p-2 h-[45px] justify-between items-center bg-gray-600 text-white">
        <div className="hover:bg-white w-8 h-8 flex items-center justify-center hover:bg-opacity-30 p-1 rounded-full hover:cursor-pointer ">
          <NavLink to="/Communities">
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </NavLink>
        </div>
        <div className="flex flex-row items-center justify-start w-[95%]">
          <div className="flex items-center justify-center h-[30px] sm:h-[35px] min-w-[30px] sm:min-w-[35px] ml-2 bg-black bg-opacity-20 rounded-full ">
            <img
              id={community.id}
              onLoadStart={getImage(community)}
              className="h-full rounded-full"
            />
          </div>
          <div className="font-medium ml-1 text-sm md:text-lg lg:text-xl p-1 border-black rounded-[14px]">
            {community?.name}
          </div>
        </div>
        <div
          className="p-1 flex-col hover:cursor-pointer transition-all hover:bg-white hover:bg-opacity-20 flex items-center justify-center w-8 h-8 rounded-xl"
          onClick={async () => {
            const dropDown = document.getElementById("communityNavBarDropDown");
            if (dropDownIsOpen) {
              dropDown.style.opacity = "0"; //make element transparent
              await wait(200); //wait for 200ms as the transition is animated
              dropDown.style.display = "none"; //make the element disappear completely from the UI
            } else {
              dropDown.style.display = "block"; //make the element present on the UI(still invisible at this point
              await wait(200); //wait for 200ms so that the element is made present on the UI
              dropDown.style.opacity = "1"; //Make the element visible by changing its opacity to 100%
            }

            setDropDownIsOpen(!dropDownIsOpen);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        <div
          id="communityNavBarDropDown"
          className="opacity-0 hover:border-opacity-75 hidden flex-col w-[95px] text-center transition-opacity duration-[150ms] p-2 bg-white text-sm md:text-base text-black absolute z-40 border-[1px] border-black border-opacity-35 rounded-xl right-7  top-[40%]"
        >
          <div
          onClick={()=>{
            const info = document.getElementById("communityInfo");
            const drop = document.getElementById("communityNavBarDropDown");
              if(info && drop){
                drop.style.display = "none"
                info.style.display = "flex";
              }
          }}
          className="hover:font-medium hover:cursor-pointer">
            {token && "info"}
          </div>
        </div>
      </div>  
    <div
    id="communityInfo"
    className="absolute z-50 hidden items-center justify-center h-screen w-full bg-black bg-opacity-30 backdrop-blur-[6px] text-white">
      <div
            onClick={() =>{
              const info = document.getElementById("communityInfo");
              if(info){
                info.style.display = "none";
              }
            }}
            className="bg-black absolute top-5 left-5 flex hover:cursor-pointer items-center justify-center w-10 h-10 bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-xl font-medium text-white"
          >
            <FontAwesomeIcon icon={faX} />
          </div>
      <div className=" flex flex-col justify-center items-center w-[80%] sm:w-[400px] md:w-[500px] h-[350px] sm:h-[400px] md:h-[500px] p-2 bg-black bg-opacity-50 rounded-md text-sm">
      <div className="flex flex-row w-[80%] sm:w-[350px] md:w-[400px] h-[50px] mb-3 sm:mb-4 items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
       <div
        className="w-[150px] flex items-center justify-end font-medium text-white text-end p-2 border-r-[1px]"
          >
          Name:
        </div>
       <div
         className="bg-transparent flex items-center autofill:bg-transparent text-white h-full placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
        >
          {community.name}
         </div>
      </div>
      <div className="flex flex-row w-[80%] sm:w-[350px] md:w-[400px] h-[50px] mb-3 sm:mb-4 items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
       <div
        className="w-[150px] flex items-center justify-end font-medium text-white text-end p-2 border-r-[1px]"
          >
          Created on:
        </div>
       <div
         className="bg-transparent flex items-center autofill:bg-transparent text-white h-full placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
        >
          {date}
         </div>
      </div>
      <div className="flex flex-row w-[80%] sm:w-[350px] md:w-[400px] min-h-[50px] mb-3 sm:mb-4 items-center rounded-[18px] bg-white bg-opacity-20 border-b-[1px] border-black border-opacity-25">
        <div
          className="w-[150px] flex items-center justify-end font-medium text-white text-end p-2 border-r-[1px]"
          >
            Description:
        </div>
        <div
          className="bg-transparent flex items-center autofill:bg-transparent text-white min-h-full placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
        >
            {community.description}
        </div>
      </div>        
      </div>
    </div>
      <div className="w-full h-fit flex items-center bg-gray-600 bg-opacity-65 justify-center p-1">
      <div
          id="searchBar"
          className="w-[55%] md:w-[400px] lg:w-[500px] transition-all duration-[200ms] flex flex-row items-center justify-center mt-2 border-[1px] rounded-xl border-black border-opacity-50 bg-white hover:border-opacity-75 focus-within:border-opacity-65"
        >
          {" "}
          <form
            className="flex flex-row text-xs sm:text-sm text-black items-center w-full"
            onSubmit={handleSubmit}
          >
            <input
              className=" mx-2 p-1 rounded-l-xl h-[30px] w-[85%] sm:w-[90%] border-0 border-opacity-0 border-none outline-none"
              type="search"
              name="search"
              placeholder="search community..."
              id="searchField"
              value={searchQuery}
              onChange={(e) => {
                e.preventDefault();
                setSearchQuery(e.target.value);
              }}
            ></input>
            <button className="w-[15%] sm:w-[10%] text-base" type="submit">
              <FontAwesomeIcon
                icon={faSearch}
                className="w-[12px] sm:w-[16px] h-[12px] sm:h-[16px]"
              />
            </button>
          </form>
        </div>
    </div>
    </div>
  );
}
