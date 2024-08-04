import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { useContext, useEffect, useState } from "react";
import Bio from "./Bio";
import Security from "./Security";
import UserUploads from "./UserUploads";
import LogOut from "./LogOut";
import { UserContext } from "./UserContext";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import BgImage from "./image3.jpg";

export default function AccountPage() {
  const navigate = useNavigate();
  const [accountManagementOptions, setAccountManagementOptions] = useState([
    <NavLink
      to="/AccountPage/Bio"
      className={({ isActive }) =>
        isActive
          ? "border-b-[1px] border-white  hover:text-[#f87058] transition-all duration-200 "
          : "text-inherit hover:text-[#f87058] transition-all duration-200 "
      }
    >
      Bio
    </NavLink>,
    <NavLink
      to="/AccountPage/Uploads"
      className={({ isActive }) =>
        isActive
          ? "border-b-[1px] border-white  hover:text-[#f87058] transition-all duration-200 "
          : "text-inherit hover:text-[#f87058] transition-all duration-200 "
      }
    >
      Uploads
    </NavLink>,
    <NavLink
      to="/AccountPage/Security"
      className={({ isActive }) =>
        isActive
          ? "border-b-[1px] border-white  hover:text-[#f87058] transition-all duration-200 "
          : "text-inherit hover:text-[#f87058] transition-all duration-200 "
      }
    >
      Security
    </NavLink>,
  ]);

  const tabOptions = {
    Bio: <Bio />,
    Uploads: <UserUploads />,
    Security: <Security />,
  };
  const pageName = useLoaderData();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const { isSignedIn } = useContext(UserContext);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    //used to reset height conditions
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
      const sidebar = document.getElementById("sideBar");
      if(sidebar){
      if (window.innerWidth > 768) {
        sidebar.style.width = "20%";
      } else {
        sidebar.style.width = "5px";
      }
    }
    });
    return window.removeEventListener("resize", () => {
      console.log("removing resize listener");
    });
  }, [windowSize]);

  const handlePopUp = () => {
    if (showPopUp) {
      document.getElementById("logoutPopup").style.display = "none";
    } else {
      document.getElementById("logoutPopup").style.display = "block";
    }

    setShowPopUp(!showPopUp);
  };

  const drawAccountManagementOptions = (option) => {
    return (
      <div key={Math.random()} className="p-1">
        {option}
      </div>
    );
  };

  if (isSignedIn)
    return (
      <div>
        <div className="flex flex-col min-h-full h-screen">
          <NavBar />
          <div
            id="main"
            className="h-fit relative flex flex-row bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: `url(${BgImage})`,
            }}
          >
            <div
              id="sideBar"
              className="w-5 absolute md:static h-full top-0 left-0 md:w-[20%] text-sm md:text-base transition-all flex flex-col justify-between font-[200] text-white"
            >
              <div className="flex flex-row-reverse justify-end h-full">
                <div
                  onClick={() => {
                    const sidebar = document.getElementById("sideBar");
                    if (sidebar && !showSideBar) {
                      sidebar.style.width = "250px";
                    } else {
                      sidebar.style.width = "20px";
                    }
                    setShowSideBar(!showSideBar);
                  }}
                  id="sideBarButton"
                  className="z-20 hover:cursor-pointer transition-all hover:text-[#f87058] bg-gray-800 mt-1 sm:mt-0 p-2 h-fit w-[25px] md:hidden flex items-center justify-center side-bar-tip text-white"
                >
                  <div classnmae="flex items-center text-base justify-center h-8">
                    {showSideBar ? (
                      <FontAwesomeIcon icon={faCaretLeft} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretRight} />
                    )}
                  </div>
                </div>
                <div
                  id="options"
                  className="w-[250px] font-[400] z-20 md:w-full md:backdrop-blur-[6px] overflow-hidden md:flex flex-col bg-gray-800"
                >
                  <div className="mt-2 sm:mt-1">
                    {accountManagementOptions.map(drawAccountManagementOptions)}
                  </div>
                  <div
                    className="hover:cursor-pointer hover:text-[#f87058] transition-all duration-200 p-1 mb-1 text-white"
                    onClick={handlePopUp}
                    id="logout"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
            <div id="tabOptions" className=" w-full md:w-[80%] h-full bg-black bg-opacity-30">
              {tabOptions[pageName]}
            </div>
          </div>
          <div id="logoutPopup" className="hidden">
            <LogOut
              showPopUp={showPopUp}
              setShowPopUp={setShowPopUp}
              handlePopUp={handlePopUp}
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  else
    return (
  <div
  className="h-fit relative flex flex-col bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: `url(${BgImage})`,
            }}
  >
      <div className="flex flex-col min-h-full h-screen justify-center items-center text-white bg-black bg-opacity-30 backdrop-blur-[6px]">
        <div className="flex flex-col items-center text-center justify-center bg-black bg-opacity-50 rounded-md p-5">
        <div className="text-lg sm:text-xl md:text-3xl mb-2">you must login first to update account details</div>
        <div className="flex flex-row">
            <div 
            onClick={()=>{
              navigate("/LoginPage");
            }}
            className="hover:cursor-pointer mx-3 p-3 w-[80px] rounded-md transition-all duration-200 bg-black bg-opacity-50 hover:bg-opacity-75 text-sm md:text-base hover:text-[#f87058] border-[1px] border-white border-opacity-5 hover:border-opacity-15 ">
              Login
            </div>
            <div
            onClick={()=>{
              navigate(-1);
            }}
            className="hover:cursor-pointer mx-3 p-3 w-[80px] rounded-md transition-all duration-200 bg-black bg-opacity-50 hover:bg-opacity-75 text-sm md:text-base hover:text-[#f87058] border-[1px] border-white border-opacity-5 hover:border-opacity-15 ">
              Go Back
            </div>
        </div>
        </div>
      </div>
      </div>
    );
}
