import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { useState } from "react";
import Bio from "./Bio";
import Security from "./Security";
import Privacy from "./Privacy";
import LogOut from "./LogOut";

export default function AccountPage() {
  const [showPopUp, setShowPopUp] = useState(false);

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
}
