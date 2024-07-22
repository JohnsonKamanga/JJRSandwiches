import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import NewCommunity from "./NewCommunitt";
import { baseurl } from "../../routes";

export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const getImage = (community)=>{
    axios.get(`${baseurl}/communities/community-pictures/${community.id}`,{
      responseType: "blob"
    })
    .then((pic)=>{
      document.getElementById(`${community.id}`).src= URL.createObjectURL(pic.data);
    })
    .catch((err)=>console.error(err));
  }

  useEffect(() => {
    const unsubscribe = () => {
      axios
        .get(`${baseurl}/communities`)
        .then((fetchedCommunities) => {
          setCommunities(fetchedCommunities.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage(`Error: ${err.errorMessage}`);
          setError(true);
        });
    };

    return () => unsubscribe();
  }, []);

  const drawCommunities = (community) => {
    return (
      <div
        key={community.id}
        className="border-[1px] m-2 text-white border-white border-opacity-25 hover:border-opacity-45 rounded-[32px] my-1 transition-colors duration-[500ms] bg-black bg-opacity-35 hover:bg-opacity-65 p-[3px]"
      >
        <div className="flex flex-col p-1 rounded-[28px] items-center border-[1px] border-white border-opacity-30">
          <div className="flex flex-row items-center">
            <div className="">
              <div className="rounded-full mr-1 h-20 w-20 flex items-center justify-center bg-black bg-opacity-60 p-1 ">
                <img className="h-fit w-fit rounded-full" id={community.id} onLoadStart={getImage(community)} alt={community.name} />
              </div>
            </div>
            <div className="">
              <NavLink
                to={`/communities/CommunityPage/${community.id}`}
                className="font-medium text-center hover:text-[#f29260] lg:text-xl "
              >
                {community.name}
              </NavLink>
            </div>
          </div>
        </div>
        <div className="p-1 border-[1px] my-3 h-[124px] overflow-hidden text-ellipsis flex flex-col items-center rounded-[24px] bg-black bg-opacity-60 border-white border-opacity-30">
          <div className="p-1 font-medium">Description:</div>
          <div className="p-2 text-center font-[150]">
            {community.description}
          </div>
        </div>
        <div className="ml-[5%] p-2 lg:text-xs text-[8px] flex">
          <span className="hidden lg:block">2000000+ members</span>
        </div>
      </div>
    );
  };

  if(loading){
    return(
      <div id="loadingScreen">
        <div className="min-h-full h-screen w-full">
        <NavBar/>
        <div className=" faq-transition h-full w-full flex flex-col items-center justify-center">
        {error ?
        (<div className="flex flex-col backdrop-blur-lg  items-center justify-center text-[#ff0000]">
          {errorMessage}
        </div>)
        :
        (<div className="flex flex-col backdrop-blur-lg  items-center justify-center">
        <FontAwesomeIcon className="animate-spin text-5xl" icon={faSpinner}/>
        <div className="text-2xl">
          Loading...
        </div>
        </div>)}
        </div>
        <Footer/>
        </div>

      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col min-h-full h-screen">
        <NavBar />
        <div className=" ">
          <div>
            <SearchBar  context="communities" setResults={setCommunities} loadingState={loading} setLoadingState={setLoading} />
            <div className="flex flex-row p-2 ">
              <div className=" mx-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {communities.map(drawCommunities)}
              </div>
              <NewCommunity />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
