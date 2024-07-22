import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faEllipsisV,
  faSearch,
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
  const community = props?.community;
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/communities/CommunityPage/${community.id}/search?query=${searchQuery}`);
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

  const getImage = (community)=>{
    axios.get(`${baseurl}/communities/community-pictures/${community.id}`,{
      responseType: "blob"
    })
    .then((pic)=>{
      document.getElementById(`${community.id}`).src= URL.createObjectURL(pic.data);
    })
    .catch((err)=>console.error(err));
  }

  return (
    <div className="w-full relative">
      <div className="flex flex-row p-2 h-[45px] justify-between items-center bg-black bg-opacity-65 text-white">
        <div className="hover:bg-white w-8 h-8 flex items-center justify-center hover:bg-opacity-30 p-1 rounded-full hover:cursor-pointer ">
          <NavLink to="/Communities">
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </NavLink>
        </div>
        <div>
          <img id={community.id} onLoadStart={getImage(community)} alt={community.name} className="h-[37px] ml-2 rounded-full"/>
        </div>
        <div className="font-medium text-xl p-1 border-black rounded-[14px]">
          {community?.name}
        </div>
        <div
          id="searchBar"
          className="w-[40%] lg:w-[60%] transition-opacity duration-[200ms] opacity-0 flex flex-row items-center my-2 border-[1px] rounded-xl border-black border-opacity-50 bg-white focus-within:border-opacity-65"
        >
          {" "}
          <div
            className="relative -left-5 hover:cursor-pointer hidden"
            id="xIcon"
            onClick={() => {
              const dropDown = document.getElementById("searchBar");
              if (showSearchBar) {
                dropDown.style.opacity = "0";
                document.getElementById("xIcon").style.display = "none";
              } else {
                dropDown.style.opacity = "1";
                document.getElementById("xIcon").style.display = "block";
              }

              setShowSearchBar(!showSearchBar);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <form
            className="flex flex-row text-black items-center w-[100%]"
            onSubmit={handleSubmit}
          >
            <input
              className=" mx-2 p-1 text-sm w-[85%] sm:w-[85%] md:w-[95%] border-0 border-opacity-0 border-none outline-none bg-transparent"
              type="text"
              name="search"
              placeholder="search community..."
              id="searchField"
              disabled={
                !showSearchBar /*controlled by the state variable showSearchBar*/
              }
              value={searchQuery}
              onChange={(e) => {
                e.preventDefault();
                setSearchQuery(e.target.value);
              }}
            ></input>
            <button type="submit">
              <FontAwesomeIcon
                icon={faSearch}
                className="w-[12px] sm:w-[16px] h-[12px] sm:h-[16px]"
              />
            </button>
          </form>
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
          className="opacity-0 hover:border-opacity-75 hidden flex-col w-[95px] text-center transition-opacity duration-[150ms] p-2 bg-white text-black absolute z-40 border-[1px] border-black border-opacity-35 rounded-xl left-[83%] lg:left-[91.5%] top-[85%]"
        >
          <div
            className="hover:font-medium hover:cursor-pointer"
            onClick={addUser}
          >
            Join
          </div>
          <div className="hover:font-medium hover:cursor-pointer">info</div>
          <div className="hover:font-medium hover:cursor-pointer">Settings</div>
          <div
            className="hover:font-medium hover:cursor-pointer"
            onClick={() => {
              const dropDown = document.getElementById("searchBar");
              if (showSearchBar) {
                dropDown.style.opacity = "0";
                document.getElementById("xIcon").style.display = "none";
              } else {
                dropDown.style.opacity = "1";
                document.getElementById("xIcon").style.display = "block";
              }
              setShowSearchBar(!showSearchBar);
            }}
          >
            Search
          </div>
        </div>
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
}
