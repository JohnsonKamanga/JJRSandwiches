import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

  return (
    <div className="flex flex-row h-[7%] sm:h-[8%] md:h-[6%] lg:h-[5%] xl:h-[8%]">
      <div className="w-[20%] sm:w-[15%] p-1 sm:p-2 text-white bg-black">
        logo
      </div>
      <div className="flex flex-row w-[70%] sm:w-[75%] font-medium text-[15px]  text-xs sm:text-sm md:text-base p-1 sm:p-2">
        <div className="hover:text-amber-400 mx-[1.5%] sm:mx-[3%] flex items-center hover:cursor-pointer">
          <NavLink
            to="/HomePage"
            className={({ isActive }) =>
              isActive ? "border-b-[1px] border-black" : "text-inherit"
            }
          >
            <span>Home</span>
          </NavLink>
        </div>

        <div className=" hover:text-amber-400 mx-[2%] sm:mx-[3%] flex items-center hover:cursor-pointer">
          <NavLink
            to="/Recipes"
            className={({ isActive }) =>
              isActive ? "border-b-[1px] border-black" : "text-inherit"
            }
          >
            <span>Recipes</span>
          </NavLink>
        </div>

        <div className=" hover:text-amber-400 mx-[2%] sm:mx-[3%] flex items-center hover:cursor-pointer">
          <NavLink
            to="/Communities"
            className={({ isActive }) =>
              isActive ? "border-b-[1px] border-black" : "text-inherit"
            }
          >
            <span>Communities</span>
          </NavLink>
        </div>

        <div className="hover:text-amber-400 mx-[2%] sm:mx-[3%] hover:cursor-pointer flex items-center">
          <NavLink
            to="/AboutUs"
            className={({ isActive }) =>
              isActive ? "border-b-[1px] border-black" : "text-inherit"
            }
          >
            <span>About Us</span>
          </NavLink>
        </div>
        <div className="hover:text-amber-400 mx-[2%] sm:mx-[3%] hover:cursor-pointer flex flex-col justify-center">
          <NavLink
            to="/FAQ"
            className={({ isActive }) =>
              isActive ? "border-b-[1px] border-black" : "text-inherit"
            }
          >
            <span>FAQ</span>
          </NavLink>
        </div>
      </div>
      <div className="flex relative items-center w-[10%] justify-end hover:cursor-pointer">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="w-[15px] sm:w-[20px] md:w-[30px] hover:w-[20px] sm:hover:w-[25px] md:hover:w-[35px] h-[15px] sm:h-[20px] md:h-[30px] hover:h-[20px] sm:hover:h-[25px] md:hover:h-[35px] mr-[15%]"
          onClick={() => {
            setDropDownIsOpen(!dropDownIsOpen);
          }}
        />
        {dropDownIsOpen && (
          <div className="flex flex-col p-3 text-xs sm:text-sm md:text-base md:p-4 text-center items-center rounded-md border-[1px] border-black bg-white border-opacity-60 absolute top-[90%] -left-[140%] sm:-left-[150%] md:-left-[150%] lg:-left-[100%] xl:-left-[55%] z-40">
            <NavLink to="/AccountPage">
              <div className="hover:cursor-pointer hover:font-[500]">
                Manage Account
              </div>
            </NavLink>
            <NavLink to="/Post">
              <div className="hover:cursor-pointer hover:font-[500]">
                Upload New Recipe
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
