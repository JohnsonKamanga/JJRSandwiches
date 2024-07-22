import CommunityPageNavBar from "./CommunityPageNavBar";
import Footer from "../HomePage/Footer";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBreadSlice, faUpRightFromSquare, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";
import { NavLink, useLoaderData } from "react-router-dom";
import NewPost from "../Post/NewPost";
import axios from "axios";
import { baseurl } from "../../routes";


export default function CommunityPage() {

  const [posts, community] = useLoaderData();
  const getImage = (user, elementID)=>{
    axios.get(`${baseurl}/users/profile-picture/${user.username}`,{
      responseType: "blob"
    })
    .then((pic)=>{
      document.getElementById(`${elementID}`).src= URL.createObjectURL(pic.data);
    })
    .catch((err)=>console.error(err));
  }

const drawCommunityPosts = (post) => {

  return(
    <div key={post?.id} className="border-[1px] text-white border-white border-opacity-35 hover:border-opacity-45 rounded-[22px] m-2 h-fit transition-colors duration-[500ms] bg-black bg-opacity-40 hover:bg-opacity-55 p-[3px]">
    <div className="flex flex-col justify-between p-2 rounded-[18px] ">
     <div className="flex flex-row ps-4 py-1 mb-2 items-center border-[1px] rounded-xl border-white border-opacity-30">
      <img id={post.id} onLoadStart={getImage(post.user, post.id)} alt={post.user.username} className="text-2xl h-[18px] lg:h-[30px] rounded-full mr-[2%] ml-[0.5%]"/>
      <NavLink to="/ViewAccount">
      <div className="font-medium hover:text-[#f29260] hover:cursor-pointer"><span className="">{post?.user?.username}</span></div>
      </NavLink>
      </div>
      <NavLink to={`/communities/CommunityPage/${community.id}/Posts/${post.id}`}>
      <div className="ps-4 py-2 h-[55px] border-[1px] border-white border-opacity-35 bg-black bg-opacity-65 rounded-xl font-light hover:text-[#f29260] text-sm overflow-hidden text-ellipsis hover:cursor-pointer">
        {post.content}</div>
      </NavLink>
    </div>
    </div>
  )
}

  return (
    <div>
    <div className="flex flex-col min-h-full h-screen">
      <CommunityPageNavBar community = {community} />
      <div className="flex flex-row h-full p-2">
      {posts.length > 0?
      (<div className=" mx-2 grid grid-rows-[150px] grid-cols-2 lg:grid-cols-3">
        {posts.map(drawCommunityPosts)}
      </div>)
    :
    (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <FontAwesomeIcon className="text-5xl animate-bounce" icon={faBreadSlice}/>
        <div className=" text-lg">There are currently no posts avaiable...</div>
      </div>
    )  
    }
      </div>
      <NewPost posts={posts} community={community}/>
      <Footer />
    </div>
    </div>
  );
}
