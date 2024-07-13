import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { useContext, useState } from "react";
import Bio from "./Bio";
import Security from "./Security";
import Privacy from "./Privacy";
import LogOut from "./LogOut";
import { UserContext } from "./UserContext";
import { NavLink } from "react-router-dom";

export default function AccountPage() {
  const [showPopUp, setShowPopUp] = useState(false);
  const {isSignedIn} = useContext(UserContext);

  const handlePopUp = ()=>{
    if(showPopUp){
    document.getElementById("logoutPopup").style.display = "none";
    }
    else{
      document.getElementById("logoutPopup").style.display = "block";
    }

    setShowPopUp(!showPopUp);
  };

  const [accountManagementOptions, setAccountManagementOptions] = useState([
    "Bio",
    "Privacy",
    "Security"
  ]);

  const [currentTabOption, setCurrentTabOption] = useState(0);

  const tabOptions = [
    <Bio/>,
    <Privacy/>,
    <Security/>
  ]

  const drawAccountManagementOptions = (option)=>{

    return(
      <div key={option} className="p-1 hover:cursor-pointer hover:font-medium border-b-[1px] border-black border-opacity-35"
      onClick={()=>{
        setCurrentTabOption(accountManagementOptions.indexOf(option));
        
      }}
      >
        {option}
      </div>
    )
  }

  if(isSignedIn)
  return (
    <div>
    <div className="flex flex-col min-h-full h-screen">
      <NavBar />
      <div className="h-[100%] flex flex-row p-2">
        <div className="w-[20%] flex flex-col justify-between border-r-[1px] border-black border-opacity-40">
        <div>{accountManagementOptions.map(drawAccountManagementOptions)}</div>
        <div className="hover:cursor-pointer text-center bg-black bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
        onClick={handlePopUp}
        >
          Logout
        </div>
        </div>
        <div className="p-1 w-[80%]">
          {tabOptions[currentTabOption]}
        </div>
      </div>
      <div id="logoutPopup" className="hidden">
      <LogOut showPopUp= {showPopUp} setShowPopUp={setShowPopUp} handlePopUp={handlePopUp}/>
      </div>
    </div>
    </div>
  );

  else 
      return(
        <div className="flex flex-col min-h-full h-screen justify-center items-center">
          <div>you must login first to update account details</div>
          <div className="flex flex-row">
          <NavLink to="/LoginPage">
          <button className="mx-1 bg-black bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
          >
            Sign In</button></NavLink>
          <NavLink to="/HomePage">
          <button className="mx-1 bg-black bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white">
            Go Back</button>
            </NavLink>
          </div>
        </div>
      )
}
