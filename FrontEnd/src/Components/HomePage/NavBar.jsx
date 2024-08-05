import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle, faX, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../Logos/logo-white-font-no-background.png";
import { wait } from "../../utilities";
import { UserContext } from "../Accounts/UserContext";

export default function NavBar() {
  const {token} = useContext(UserContext);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(()=>{
    window.addEventListener("resize", () => {
      const element = document.getElementById("navBarOptions");
      setWindowSize(window.innerWidth);
      if(element){
      if(window.innerWidth > 639){
      element.style.height = "100%";
      }
      else{
        element.style.height = "0px";
      }}
    });
    return window.removeEventListener("resize", () => {
      console.log("removing resize listener");
    });
  },[windowSize])

  return (
    <div className="flex z-30 flex-row justify-between sm:justify-normal bg-gray-600 text-white min-h-[7%] sm:h-[8%] md:h-[8%] lg:h-[8%] xl:h-[8%]">
      <div className="flex items-center justify-start w-[47%] sm:h-full sm:w-fit">
        <NavLink to="/HomePage">
      <img
        src={Logo}
        className="bg-transparent border-white border-opacity-50 sm:border-r-[1px] p-[9px] h-full "
      />
      </NavLink>
      </div>
      <div
      id="navBarOptions"
      className="h-0 z-30 overflow-hidden sm:h-full flex absolute top-[6.5%] sm:top-0 sm:static sm:flex flex-col sm:flex-row items-center w-full sm:w-[75%] backdrop-blur-[6px] sm:backdrop-blur-0 bg-inherit sm:bg-transparent transition-all  font-medium text-center text-[10px] sm:text-xs md:text-sm xl:text-base p-1 sm:p-2">
        <div className=" hover:text-[#f29260] transition-colors duration-[120ms] mt-[0.5%] sm:mt-0 mx-[1.5%] sm:mx-[3%] flex items-center hover:cursor-pointer">
          <NavLink
            to="/HomePage"
            className={({ isActive }) =>
              isActive ? "border-b-[1px] border-white" : "text-inherit"
            }
          >
            <span>Home</span>
          </NavLink>
        </div>

        <div className=" hover:text-[#f29260] transition-colors duration-[120ms] mx-[2%] sm:mx-[3%] flex items-center hover:cursor-pointer">
          <NavLink
            to="/Recipes"
            className={({ isActive }) =>
              isActive ? "border-b-[1px] border-white" : "text-inherit"
            }
          >
            <span>Recipes</span>
          </NavLink>
        </div>

        <div className=" hover:text-[#f29260] transition-colors duration-[120ms] mx-[2%] sm:mx-[3%] flex items-center hover:cursor-pointer">
          <NavLink
            to="/Communities"
            className={({ isActive }) =>
              isActive ? "border-b-[1px] border-white" : "text-inherit"
            }
          >
            <span>Communities</span>
          </NavLink>
        </div>

        <div className="hover:text-[#f29260] z-20 transition-colors duration-[120ms] mx-[2%] sm:mx-[3%] hover:cursor-pointer flex items-center">
          <NavLink
            to="/AboutUs"
            className={({ isActive }) =>
              isActive ? "border-b-[1px] border-white" : "text-inherit"
            }
          >
            <span>About Us</span>
          </NavLink>
        </div>
        <div className="hover:text-[#f29260] z-20 transition-colors duration-[120ms] mx-[2%] sm:mx-[3%] hover:cursor-pointer flex items-center">
          <NavLink
            to="/FAQ"
            className={({ isActive }) =>
              isActive ? "border-b-[1px] border-white" : "text-inherit"
            }
          >
            <span>FAQ</span>
          </NavLink>
        </div>
        <div className="hover:text-[#f29260] z-20 transition-colors duration-[120ms] mx-[2%] sm:mx-[3%] hover:cursor-pointer flex items-center">
          <NavLink
            to="/Attributions"
            className={({ isActive }) =>
              isActive ? "border-b-[1px] border-white" : "text-inherit"
            }
          >
            <span>Attributions</span>
          </NavLink>
        </div>
        {
          token ?
        <div className="flex flex-col items-center z-20 sm:hidden">
          <div className="hover:text-[#f29260] z-20 transition-colors duration-[120ms] mx-[2%] sm:mx-[3%] hover:cursor-pointer flex items-center">
          <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-[1px] border-white" : "text-inherit"
          }
          to="/AccountPage">
            <div>
              {token && "Manage Account"}
            </div>
          </NavLink>
          </div>
          <div className="hover:text-[#f29260] w-full z-20 transition-colors duration-[120ms] mx-[2%] sm:mx-[3%] hover:cursor-pointer flex items-center">
          <NavLink 
          className={({ isActive }) =>
            isActive ? "border-b-[1px] border-white" : "text-inherit"
          }
          to="/UploadPost">
            <div className="hover:cursor-pointer hover:font-[500]">
              {token && "Upload New Recipe"}
            </div>
          </NavLink>
          </div>
          </div>
          :
          <div className="hover:text-[#f29260] sm:hidden w-full z-20 transition-colors duration-[120ms] mx-[2%] sm:mx-[3%] hover:cursor-pointer flex items-center justify-center">
            <NavLink to="/LoginPage">
            <div className="hover:cursor-pointer hover:font-[500]">
              login
            </div>
            </NavLink>
            </div>
        }
      </div>
      <div className="flex flex-col items-center justify-center hover:cursor-pointer hover:text-[#f87058] transition-all mr-2 sm:hidden"
      onClick={()=>{
        const element = document.getElementById("navBarOptions");
        if(element.offsetHeight < 9){
          element.style.height = "140px";
        }
        else {
          element.style.height = "0px";
        }
        setShowHamburger(!showHamburger);
      }}
      >
          <FontAwesomeIcon icon={showHamburger? faX : faBars}/>
      </div>
      <div className="hidden sm:flex relative items-center w-[10%] justify-end">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="w-[15px] sm:w-[20px] md:w-[30px] duration-300 hover:cursor-pointer hover:animate-pulse rounded-full h-[15px] sm:h-[20px] md:h-[30px] mr-[15%]"
          onClick={async () => {
            const drop = document.getElementById("dropDown");
            if (dropDownIsOpen === false) {
              drop.style.display = "block";
              await wait(200);
              drop.style.opacity = "1.0";
            } else {
              drop.style.opacity = "0.0";
              await wait(400);
              drop.style.display = "none";
              
            }
            setDropDownIsOpen(!dropDownIsOpen);
          }}
        />
        <div
          id="dropDown"
          className="hidden opacity-0 text-black transition-opacity duration-[150ms] w-[200%] lg:w-[129%] p-3 text-xs sm:text-sm md:text-base md:p-4 text-center items-center rounded-md border-[1px] border-white bg-white border-opacity-60 absolute top-[90%] right-7 md:right-10 z-40"
        >
          <NavLink to="/LoginPage">
            <div className="hover:cursor-pointer hover:font-[500]">
              {!token && "Login"}
            </div>
          </NavLink>
          <NavLink to="/AccountPage/Bio">
            <div className="hover:cursor-pointer hover:font-[500]">
              {token && "Manage Account"}
            </div>
          </NavLink>
          <NavLink to="/UploadPost">
            <div className="hover:cursor-pointer hover:font-[500]">
              {token && "Upload New Recipe"}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
