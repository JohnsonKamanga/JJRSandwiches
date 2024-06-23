import { faArrowLeftLong, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function MiniAccountTab() {
  const [windowsize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));
    return window.removeEventListener("resize", () => {
      console.log("removing resize listener");
    });
  }, [windowsize]);
  if (windowsize < 768)
    return (
      <div>
        <div className="transition-all duration-200 flex flex-row items-center absolute md:static top-[7.5%] w-[98%] text-xl ">
        <NavLink to="/CommunityPage">
        <FontAwesomeIcon icon={faArrowLeftLong} className="mr-1 text-lg hover:bg-black transition-all duration-150 bg-opacity-0 hover:bg-opacity-40 rounded-full p-2 hover:cursor-pointer"/>
        </NavLink>
          <div className="flex items-center p-2 font-extralight rounded-[20px]">
            <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
            <NavLink to="/AccountPage" className="flex items-center">
            <span className="mx-2 hover:cursor-pointer text-[17px] transition-all duration-100 font-medium hover:font-bold"> post owner </span>
            </NavLink>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex flex-col items-center p-2 h-[250px] lg:h-[300px] bg-black bg-opacity-85 rounded-[18px]">
        <div className="w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] xl:w-[52%] xl:h-[80%] rounded-full bg-white opacity-45 flex justify-center items-center text-center">
          {" "}
          profile picture
        </div>
        <div className="text-2xl text-white hover:font-medium">
          <NavLink to="/AccountPage">Post Owner</NavLink>
        </div>
      </div>
    </div>
  );
}
