import { useState } from "react";
import DropDown from "./DropDown";

export default function NavBar(){
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

    return(
        <div className="flex flex-row font-bold h-[6%]">
            <div className="w-[15%] p-2">
                logo
            </div>
            <div className="flex flex-row w-[85%] text-sm p-2 bg-blue-500">
            <div className="hover:text-white mx-8 hover:cursor-pointer">
                Home
            </div>
            <div className="hover:text-white mx-8 hover:cursor-pointer">
                Recipies
            </div>
            <div className="hover:text-white mx-8 hover:cursor-pointer">
                Ratings
            </div>
            <div className="hover:text-white mx-8 hover:cursor-pointer">
                Feedback
            </div>
            <div className=" hover:cursor-pointer"
            
            >
                <button onClick={(event)=>{
                event.preventDefault();
                setDropDownIsOpen(!dropDownIsOpen); }}
                className="hover:text-white"
                >
                    drop
                </button>

                <DropDown isOpen = {dropDownIsOpen}/>
            </div>
            </div>
        </div>
    )
}