import CommunityPageNavBar from "./CommunityPageNavBar";
import Footer from "../HomePage/Footer";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faUpRightFromSquare,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";
import { NavLink, useLoaderData } from "react-router-dom";
import NewPost from "../Post/NewPost";
import axios from "axios";
import { baseurl } from "../../routes";
import { UserContext } from "../Accounts/UserContext";
import DefaultProfilePicture from "../Accounts/default-user-picture.jpg";

export default function CommunityPage() {
  const [posts, community] = useLoaderData();
  const { token } = useContext(UserContext);

  const drawCommunityPosts = (post) => {
    const time = new Date(post.postedAt).toLocaleTimeString();
    const timestamp = time.slice(0, 4) + time.slice(7);
    return (
      <div
        key={post?.id}
        className="border-[1px] text-xs sm:text-sm text-white border-white border-opacity-35 hover:border-opacity-45 rounded-[22px] m-2 h-fit min-w-[40%] sm:min-w-[270px] transition-colors duration-[500ms] bg-black bg-opacity-40 hover:bg-opacity-55 p-[3px]"
      >
        <div className="flex flex-col justify-between p-2 rounded-[18px] ">
          <div className="flex flex-row ps-4 py-1 mb-2 items-center border-[1px] rounded-xl border-white border-opacity-30">
            <div className="h-[18px] w-[18px] lg:h-[30px] lg:w-[30px] rounded-full bg-black bg-opacity-30 mr-[2%] ml-[0.5%]">
            <img
              id={post.id}
              src={
                post?.user?.profilePicture && post?.user?.profilePicture != '' ?
                post?.user?.profilePicture
                :
                DefaultProfilePicture
              }
              className="text-2xl h-full rounded-full"
            />
            </div>
            <NavLink to={`/ViewPosts/${post.user.id}`}>
              <div className="font-medium hover:text-[#f29260] hover:cursor-pointer">
                <span className="">{post?.user?.username}</span>
              </div>
            </NavLink>
          </div>
          <NavLink
            to={`/communities/CommunityPage/${community.id}/Posts/${post.id}`}
          >
            <div className="flex items-center py-2 h-[55px] w-full border-[1px] border-white border-opacity-35 bg-black bg-opacity-65 rounded-xl font-light hover:text-[#f29260] hover:cursor-pointer">
              <p className="p-2 truncate">{post.content}</p>
            </div>
          </NavLink>
          <div className=" text-end text-xs lg:text-sm font-light pt-1">{timestamp}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col min-h-full h-screen">
        <CommunityPageNavBar community={community} />
        <div
          id="main"
          onLoad={() => {
            if (posts.length > 0) {
              const topHeight = document.getElementById("posts").offsetTop;
              const currentheight =
                document.getElementById("main").offsetHeight;
              const deltaHeight = currentheight - topHeight;
              document.getElementById("main").style.height = `${
                currentheight +
                (window.innerWidth < 786 ? deltaHeight / 2 : deltaHeight / 6)
              }px`;
            }
          }}
          className="flex flex-col items-center h-full bg-gray-600 bg-opacity-65 p-2"
        >
          {posts.length > 0 ? (
            <div id="posts" className=" mx-2 grid grid-cols-2 lg:grid-cols-3">
              {posts.map(drawCommunityPosts)}
            </div>
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center text-white">
              <FontAwesomeIcon
                className="text-5xl animate-bounce"
                icon={faBreadSlice}
              />
              <div className=" text-lg">
                There are currently no posts avaiable...
              </div>
            </div>
          )}
        </div>
        {token && <NewPost posts={posts} community={community} />}
        <Footer />
      </div>
    </div>
  );
}
