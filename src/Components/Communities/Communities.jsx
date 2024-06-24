import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";
import { NavLink } from "react-router-dom";

export default function Communities() {
  const [communities, setCommunities] = useState([
    {
      name: "CommunityOne",
      icon: "logo",
    },
    {
      name: "CommunityTwo",
      icon: "logo",
    },
    {
      name: "CommunityThree",
      icon: "logo",
    },
    {
      name: "CommunityFour",
      icon: "logo",
    },
    {
      name: "CommunityFive",
      icon: "logo",
    },
    {
      name: "CommunitySix",
      icon: "logo",
    },
    {
      name: "CommunitySeven",
      icon: "logo",
    },
    {
      name: "CommunityEight",
      icon: "logo",
    },
    {
      name: "CommunityNine",
      icon: "logo",
    },
    {
      name: "CommunityTen",
      icon: "logo",
    },
    {
      name: "CommunityEleven",
      icon: "logo",
    },
    {
      name: "CommunityTwelve",
      icon: "logo",
    },
  ]);

  const drawCommunities = (community) => {
    return (
      <div
        key={community.name}
        className="border-[1px] text-white border-white border-opacity-25 hover:border-opacity-45 rounded-[32px] my-1 transition-colors duration-[500ms] bg-black bg-opacity-35 hover:bg-opacity-65 p-[3px]"
      >
        <div className="flex flex-row justify-between p-1 rounded-[28px] items-center border-[1px] border-black bg-black bg-opacity-65 border-opacity-35 hover:border-opacity-95 hover:cursor-pointer">
          <div className="flex flex-row items-center">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-5xl mr-[5%] ml-[0.5%]"
            />
            <NavLink to="/CommunityPage">
              <div className="font-medium hover:text-[#f29260] lg:text-xl ">
                {community.name}
              </div>
            </NavLink>
          </div>
          <div className="mr-[5%] p-2 lg:text-xs text-[8px] flex">
            <span className="mt-[16%] hidden lg:block">2000000+ members</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-full h-screen">
      <NavBar />
      <SearchBar />
      <div className=" bg-gradient-to-l from-[#1614a1] from-10% via-[#ae2db9] via-60% to-[#f8f8f8] to-95% ">
        <div className="flex flex-row p-2">
          <div className="h-[88%] w-[50%] mx-2 flex flex-col md:grid-cols-3 lg:grid-cols-4">
            {communities.map(drawCommunities)}
          </div>
          <div className="h-[88%] w-[50%] mx-2 flex flex-col md:grid-cols-3 lg:grid-cols-4">
            {communities.map(drawCommunities)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
