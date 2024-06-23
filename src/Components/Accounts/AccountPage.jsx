import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { useState } from "react";
import Bio from "./Bio";
import Security from "./Security";
import Privacy from "./Privacy";

export default function AccountPage() {

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
      <div className="h-[88%] flex flex-row p-2">
        <div className="w-[20%] flex flex-col justify-between border-r-[1px] border-black border-opacity-40">
        <div>{accountManagementOptions.map(drawAccountManagementOptions)}</div>
        <div>
          Logout
        </div>
        </div>
        <div className="p-1 w-[80%] min-h-full">
          {tabOptions[currentTabOption]}
        </div>
      </div>
    </div>
    </div>
  );
}
