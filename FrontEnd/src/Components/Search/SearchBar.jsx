import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { wait } from "../../utilities";
import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`You searched: ${searchQuery}`);
  };

  const [showPopUp, setShowPopUp] = useState(false);

  const [currentOrderByOption, setCurrentOrderByOption] = useState(0);

  const OrderByOptions = ["OrderBy", "Name", "Ingredients", "Time"];

  return (
    <div className="min-w-full h-[15%] md:h-[7%] lg:h-[8%] xl:h-[15%] flex flex-col items-center p-2">
      <div className="w-[60%] flex flex-row items-center mb-2 border-[1px] rounded-xl border-black transition-all duration-200 border-opacity-20 hover:border-opacity-65 focus-within:border-opacity-65">
        <form
          className="flex flex-row items-center w-[100%]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="search"
            className=" mx-2 p-1 text-sm w-[85%] sm:w-[90%] md:w-[95%] border-0 border-opacity-0 border-none outline-none "
            placeholder="search"
            onChange={(e) => {
              e.preventDefault();
              setSearchQuery(e.target.value);
            }}
            value={searchQuery}
          ></input>
          <button type="submit">
            {" "}
            <FontAwesomeIcon
              icon={faSearch}
              className="w-[12px] sm:w-[16px] h-[12px] sm:h-[16px]"
            />
          </button>
        </form>
      </div>
      <div
        className="p-1 flex flex-row w-[16%] lg:w-[8%] justify-center items-center rounded-xl border-black border-opacity-25 transition-all duration-200 hover:border-opacity-65 border-[1px] hover:cursor-pointer focus:border-opacity-65 relative"
        onClick={async () => {
          const drop = document.getElementById("popup");
          if (showPopUp === false) {
            drop.style.display = "block";
            await wait(200);
            drop.style.opacity = "1.0";
          } else {
            drop.style.opacity = "0.0";
            await wait(200);
            drop.style.display = "none";
            
          }
          setShowPopUp(!showPopUp);
        }}
      >
        <span className="font-medium text-xs md:text-sm p-1">
          {OrderByOptions[currentOrderByOption]}
        </span>
        {showPopUp ? (
          <FontAwesomeIcon
            icon={faCaretDown}
            className="w-[8px] md:w-[12px] h-[8px] md:h-[12px] ml-[0.5%]"
          />
        ) : (
          <FontAwesomeIcon
            icon={faAngleDown}
            className="w-[8px] md:w-[12px] h-[8px] md:h-[12px] ml-[0.5%]"
          />
        )}
          <div id="popup" className="hidden transition-opacity duration-[150ms] opacity-0 w-[120%] p-2 text-sm rounded-md border-[1px] border-black bg-white border-opacity-60 absolute top-[110%]  left-[50%] z-40">
            <div
              className=" border-b-[1px] border-black border-opacity-20 hover:font-semibold hover:cursor-pointer"
              onClick={() => setCurrentOrderByOption(0)}
            >
              Default
            </div>
            <div
              className=" border-b-[1px] border-black border-opacity-20 hover:font-semibold hover:cursor-pointer"
              onClick={() => setCurrentOrderByOption(1)}
            >
              Name
            </div>
            <div
              className=" border-b-[1px] border-black border-opacity-20 hover:font-semibold hover:cursor-pointer"
              onClick={() => setCurrentOrderByOption(2)}
            >
              Ingredients
            </div>
            <div
              className="hover:font-semibold hover:cursor-pointer"
              onClick={() => setCurrentOrderByOption(3)}
            >
              Time
            </div>
          </div>
      </div>
    </div>
  );
}