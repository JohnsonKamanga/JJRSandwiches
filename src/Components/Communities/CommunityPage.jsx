import CommunityPageNavBar from "./CommunityPageNavBar";
import Footer from "../HomePage/Footer";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";
import { NavLink } from "react-router-dom";


export default function CommunityPage() {
  const [communityPosts, setCommunityPosts] = useState([
          {
            id: "PostOne",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          },
          {
            id: "PostTwo",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          },
          {
            id: "PostThree",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          },
          {
            id: "PostFour",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          },
          {
            id: "PostFive",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          },
          {
            id: "PostSix",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          },
          {
            id: "PostSeven",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          },
          {
            id: "PostEight",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          },
          {
            id: "PostNine",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          },
          {
            id: "PostTen",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          },
          {
            id: "PostEleven",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          },
          {
            id: "PostTwelve",
            user: "Anonymous",
            content: "some random content that is supposed to be a post some more stuff is added to test overflow hahahahahahahaha"
          }
  ]); 

const drawCommunityPosts = (post) => {

  return(
    <div key={post.id} className="border-[1px] border-black border-opacity-35 hover:border-opacity-95 rounded-[32px] my-1 transition-colors duration-[500ms] bg-white hover:bg-[#f29260] p-[3px]">
    <div className="flex flex-col justify-between p-2 rounded-[28px] border-[1px] border-black bg-white border-opacity-35 hover:border-opacity-95 hover:cursor-pointer">
     <div className="flex flex-row ps-2 items-center">
      <FontAwesomeIcon icon={faUserCircle} className="text-xl mr-[2%] ml-[0.5%]"/>
      <NavLink to="/ViewAccount">
      <div className="hover:font-medium "><span className="">{post.user}</span></div>
      </NavLink>
      </div>
      <NavLink to="/ViewPost">
      <div className="p-2 h-[50px] font-light hover:font-medium hover:text-[13px] text-sm overflow-hidden">{post.content}</div>
      </NavLink>
    </div>
    </div>
  )
}

  return (
    <div className="flex flex-col min-h-full h-screen">
      <CommunityPageNavBar />
      <div className="flex flex-row faq-transition p-2">
      <div className=" w-[50%] mx-2 flex flex-col md:grid-cols-3 lg:grid-cols-4">
        {communityPosts.map(drawCommunityPosts)}
      </div>
      <div className=" w-[50%] mx-2 flex flex-col md:grid-cols-3 lg:grid-cols-4">
        {communityPosts.map(drawCommunityPosts)}
      </div>
      </div>
      <Footer />
    </div>
  );
}
