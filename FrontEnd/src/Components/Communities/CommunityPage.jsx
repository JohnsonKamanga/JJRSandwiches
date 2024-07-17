import CommunityPageNavBar from "./CommunityPageNavBar";
import Footer from "../HomePage/Footer";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";
import { NavLink, useLoaderData } from "react-router-dom";
import NewPost from "../Post/NewPost";


export default function CommunityPage() {

  const [posts, community] = useLoaderData();

const drawCommunityPosts = (post) => {

  return(
    <div key={post?.id} className="border-[1px] text-white border-white border-opacity-25 hover:border-opacity-45 rounded-[50px] my-1 transition-colors duration-[500ms] bg-black bg-opacity-35 hover:bg-opacity-55 p-[3px]">
    <div className="flex flex-col justify-between p-2 rounded-[46px] border-[1px] border-black bg-black bg-opacity-65 border-opacity-35 hover:border-opacity-95 hover:cursor-pointer">
     <div className="flex flex-row ps-4 items-center">
      <FontAwesomeIcon icon={faUserCircle} className="text-xl mr-[2%] ml-[0.5%]"/>
      <NavLink to="/ViewAccount">
      <div className="hover:font-medium "><span className="">{post?.user?.username}</span></div>
      </NavLink>
      </div>
      <NavLink to={`/communities/CommunityPage/${community.id}/Posts/${post.id}`}>
      <div className="ps-4 py-2 h-[50px] font-light hover:font-medium hover:text-[13px] text-sm overflow-hidden">{post.content}</div>
      </NavLink>
    </div>
    </div>
  )
}

  return (
    <div className="flex flex-col min-h-full h-screen">
      <CommunityPageNavBar community = {community} />
      <div className="flex flex-row min-h-ful h-screen mt-[6.5%] lg:mt-[3%] faq-transition p-2">
      <div className=" w-[50%] mx-2 flex flex-col md:grid-cols-3 lg:grid-cols-4">
        {posts.map(drawCommunityPosts)}
      </div>
      <div className=" w-[50%] mx-2 flex flex-col md:grid-cols-3 lg:grid-cols-4">
        {posts.map(drawCommunityPosts)}
      </div>
      </div>
      <NewPost posts={posts} community={community}/>
      <Footer />
    </div>
  );
}
