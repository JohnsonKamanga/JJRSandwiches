import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import NewCommunity from "./NewCommunitt";
import { baseurl } from "../../routes";
import { UserContext } from "../Accounts/UserContext";
import BgImage from "./two-sandwiches-tablecloth-with-copy-space.jpg"

export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token} = useContext(UserContext);
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

  useEffect(() => { 
    unsubscribe();
  }, []);

  const drawCommunities = (community) => {
    return (
      <div
        key={community.id}
        className="border-[1px] w-full sm:w-fit sm:m-2 text-white border-white border-opacity-25 hover:border-opacity-45 rounded-[32px] my-1 transition-colors duration-[500ms] bg-black bg-opacity-35 hover:bg-opacity-65 p-[6px] sm:p-3"
      >
        <div className="flex flex-col sm:min-h-fit p-1 rounded-[28px] items-center border-[1px] border-white border-opacity-30">
          <div className="flex flex-row items-center w-full sm:w-fit">
            <div className="w-[30%] flex items-center justify-center sm:mr-1 ">
              <div className="rounded-full h-[40px] w-[40px] sm:h-full sm:w-full flex items-center justify-center bg-black bg-opacity-60 p-1 sm:p-[6px] ">
                <img className="h-full sm:h-fit sm:w-fit rounded-full" id={community.id} onLoadStart={getImage(community)} />
              </div>
            </div>
            <div className="m-[1px] sm:m-0 w-[70%]">
              <NavLink
                to={`/communities/CommunityPage/${community.id}`}
                className="font-medium flex items-center text-start hover:text-[#f29260] text-xs sm:text-sm lg:text-xl "
              >
                {community.name}
              </NavLink>
            </div>
          </div>
        </div>
        <div className="p-1 hidden sm:flex flex-col items-center border-[1px] mt-3 h-[124px] overflow-hidden text-ellipsis rounded-[24px] bg-black bg-opacity-60 border-white border-opacity-30">
          <div className="p-1 font-medium">Description:</div>
          <div className="p-2 text-center font-[150]">
            {community.description}
          </div>
        </div>
      </div>
    );
  };

  if(loading){
    return(
      <div id="loadingScreen">
        <div className="min-h-full h-screen w-full">
        <NavBar/>
        <div className="h-full w-full flex flex-col items-center justify-center bg-gray-600 bg-opacity-65">
        {error ?
        (<div className="flex flex-col backdrop-blur-lg bg-black bg-opacity-35 w-[250px] h-[250px] rounded-md items-center justify-center text-[#ff0000]">
          {errorMessage}
        </div>)
        :
        (<div className="flex flex-col backdrop-blur-lg text-white bg-black bg-opacity-35 w-[250px] h-[250px] rounded-md items-center justify-center">
        <FontAwesomeIcon className="animate-spin text-3xl" icon={faSpinner}/>
        <div className="text-xl">
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
        <div className=" h-full sm:h-fit bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
        >
          <div className="min-h-screen bg-black bg-opacity-30 backdrop-blur-[4px]">
            <SearchBar  context="communities" setResults={setCommunities} loadingState={loading} setLoadingState={setLoading} />
            <div className="flex flex-row justify-center p-2 w-full ">
              <div className=" sm:mx-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {communities.map(drawCommunities)}
              </div>
              {token && <NewCommunity communities={communities} setCommunities={setCommunities} />}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
