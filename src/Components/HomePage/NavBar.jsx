import { useState } from "react";
import DropDown from "./DropDown";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookOpen,
  faCommentDots,
  faHome,
  faPenToSquare,
  faStarHalfStroke,
  faUserAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

  return (
    <div className="flex flex-row h-[7%] sm:h-[8%]">
      <div className="w-[20%] sm:w-[15%] p-1 sm:p-2 text-white bg-black">logo</div>
      <div className="flex flex-row w-[70%] sm:w-[75%] text-[15px] sm:text-sm p-1 sm:p-2">
        <div className="hover:text-amber-400 mx-[3%] flex items-center hover:cursor-pointer">
          <NavLink to="/HomePage" className="flex flex-col">
            <FontAwesomeIcon icon={faHome} />
            <span className=" ">Home</span>
          </NavLink>
        </div>

        <div className=" hover:text-amber-400 mx-[3%] flex items-center hover:cursor-pointer">
          <NavLink to="/Recipes" className="flex flex-col">
            <FontAwesomeIcon icon={faBookOpen} />
            <span>Recipes</span>
          </NavLink>
        </div>

        <div className=" hover:text-amber-400 mx-[3%] flex items-center hover:cursor-pointer">
          <NavLink to="/Ratings" className="flex flex-col">
            <FontAwesomeIcon icon={faStarHalfStroke} />
            <span>Ratings</span>
          </NavLink>
        </div>

        <div className="hover:text-amber-400 mx-[3%] hover:cursor-pointer flex items-center">
          <NavLink to="/Feedback" className="flex flex-col">
            <FontAwesomeIcon icon={faCommentDots} />
            <span>Feedback</span>
          </NavLink>
        </div>
          <div className=" hover:cursor-pointer flex flex-col hover:text-amber-400 mx-[3%]">
            <FontAwesomeIcon icon={faPenToSquare}/>
            <span>Post</span>
          </div>
      </div>
      <div className="flex items-center w-[10%] justify-end hover:cursor-pointer ">
        <FontAwesomeIcon icon={faUserCircle} className=" w-[30px] h-[30px] mr-[20%]"/>
      </div>
    </div>
  );
}
