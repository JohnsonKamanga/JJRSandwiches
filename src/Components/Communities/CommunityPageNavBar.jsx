import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faCogs, faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { wait } from "../../utilities";

export default function CommunityPageNavBar(){
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`You searched: ${searchQuery}`);
      };
  return (
        <div className="mb-5">
            <div className="flex flex-row p-2 h-[45px] justify-between items-center popup">
                <div className="bg-white p-1 rounded-full border-[1px] border-black border-opacity-55 ">
                    <NavLink to="/Communities">
                    <FontAwesomeIcon icon={faArrowLeftLong}/>
                    </NavLink>
                </div>
                <div className="font-medium text-xl border-[1px] p-1 border-black rounded-[14px]">
                   Community Name 
                </div>
                <div className="p-1 hover:cursor-pointer bg-white rounded-2xl border-[1px] border-black" 
                onClick={async ()=>{

                    const dropDown = document.getElementById("communityNavBarDropDown");
                    if(dropDownIsOpen){
                    dropDown.style.opacity = "0";
                    await wait(200);
                    dropDown.style.display = "none";   
                    }
                    else{
                        dropDown.style.display = "block";
                        await wait(200);
                        dropDown.style.opacity = "1";
                    }

                    setDropDownIsOpen(!dropDownIsOpen);
                }}
                >
                    <FontAwesomeIcon icon={faCogs}/>
                </div>
                <div id="communityNavBarDropDown" 
                className="opacity-0 hover:border-opacity-75 hidden w-[95px] text-center transition-opacity duration-[150ms] p-2 popup absolute z-40 border-[1px] border-black border-opacity-35 rounded-xl left-[80%] top-[7%]">
                <div className="hover:font-medium hover:cursor-pointer">Join</div>
                <div className="hover:font-medium hover:cursor-pointer">Block</div>
                <div className="hover:font-medium hover:cursor-pointer">Settings</div>
                </div>
            </div>
            <div className="flex justify-center">
            <div className="w-[60%] flex flex-row items-center my-2 border-[1px] rounded-xl border-black border-opacity-20 focus-within:border-opacity-65">
            <form
            className="flex flex-row items-center w-[100%]"
            onSubmit={handleSubmit}
            >
                <input 
                className=" mx-2 p-1 text-sm w-[85%] sm:w-[90%] md:w-[95%] border-0 border-opacity-0 border-none outline-none "
                type="text"
                name="search"
                placeholder="search"
                value={searchQuery}
                onChange={(e) => {
                    e.preventDefault();
                    setSearchQuery(e.target.value);
                  }}
                >

                </input>
                <button
                type="submit"
                >
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
