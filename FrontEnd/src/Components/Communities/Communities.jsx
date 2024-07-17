import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import NewCommunity from "./NewCommunitt";
import { baseurl } from "../../routes";

export default function Communities() {
  const [communities, setCommunities] = useState([]);

  useEffect(()=>{

    const unsubscribe = ()=>{axios.get(`${baseurl}/communities`)
          .then((fetchedCommunities)=>{
            setCommunities(fetchedCommunities.data);
          })
          .catch((err)=>{
            console.err(err);
          })}

          return ()=>unsubscribe();

  },[communities])

  const drawCommunities = (community) => {
    return (
      <div
        key={community.id}
        className="border-[1px] h-fit text-white border-white border-opacity-25 hover:border-opacity-45 rounded-[32px] my-1 transition-colors duration-[500ms] bg-black bg-opacity-35 hover:bg-opacity-65 p-[3px]"
      >
        <div className="flex flex-row justify-between p-1 rounded-[28px] items-center border-[1px] border-black bg-black bg-opacity-65 border-opacity-35 hover:border-opacity-95 hover:cursor-pointer">
          <div className="flex flex-row items-center">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-5xl mr-[5%] ml-[0.5%]"
            />
            <NavLink to={`/communities/CommunityPage/${community.id}`}>
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
    <div>
    <div className="flex flex-col min-h-full h-screen">
      <NavBar />
      <SearchBar />
      <div className="bg-gradient-to-l from-[#1614a1] from-10% via-[#ae2db9] via-60% to-[#f8f8f8] to-95% ">
        <div className="flex flex-row  p-2 min-h-full h-screen">
          <div className="h-[88%] mx-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {communities.map(drawCommunities)}
          </div>
        </div>
        <NewCommunity/>
      </div>
      <Footer />
    </div>
    </div>
  );
}
