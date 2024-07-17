import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";
import CommentSection from "./CommentSection";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import MiniAccountTab from "../Accounts/MiniAccountTab";
import PostOptionsBar from "./PostOptionsBar";
import Comments from "./Comments";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { UserContext } from "../Accounts/UserContext";
import axios from "axios";
import { baseurl } from "../../routes";

const myComments = [
  {
    Comment: "comment1",
    subComments: {
      visible: false,
      subcomments: [
        "comment1-subcomment1",
        "comment1-subcomment2",
        "comment1-subcomment3",
        "comment1subcomment4",
      ],
    },
  },
  {
    Comment: "comment2",
    subComments: {
      visible: false,
      subcomments: [
        "comment2-subcomment1",
        "comment2-subcomment2",
        "comment2-subcomment3",
        "comment2-subcomment4",
      ],
    },
  },
  {
    Comment: "comment3",
    subComments: {
      visible: false,
      subcomments: [
        "comment3-subcomment1",
        "comment3-subcomment2",
        "comment3-subcomment3",
        "comment3-subcomment4",
      ],
    },
  },
  {
    Comment: "comment4",
    subComments: {
      visible: false,
      subcomments: [
        "comment4-subcomment1",
        "comment4-subcomment2",
        "comment4-subcomment3",
        "comment4-subcomment4",
      ],
    },
  },
  {
    Comment: "comment5",
    subComments: {
      visible: false,
      subcomments: [
        "comment5-subcomment1",
        "comment5-subcomment2",
        "comment5-subcomment3",
        "comment5-subcomment4",
      ],
    },
  },
  {
    Comment: "comment6",
    subComments: {
      visible: false,
      subcomments: [
        "comment6-subcomment1",
        "comment6-subcomment2",
        "comment6-subcomment3",
        "comment6-subcomment4",
      ],
    },
  },
];

export default function ViewPost() {
  const post = useLoaderData();
  const {token} = useContext(UserContext);
  const [decodedToken, setDecodedToken] = useState();
  const [windowsize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));
    return window.removeEventListener("resize", () => {
      console.log("removing resize listener");
    });
  }, [windowsize]);

  useEffect(()=>{
    axios.post(`${baseurl}/auth/decode`,{access_token: token?.data?.access_token})
         .then((dToken)=>{
          setDecodedToken(dToken.data);
         })
         .catch(()=>alert('an error occured while decoding the token'));
  },[]);

  return (
    <div>
      <div className="min-h-full h-screen">
        <NavBar />
        <div className="min-h-full h-screen flex flex-col md:flex-row">
          <div id="post" className="md:w-[65%] mt-[35px] md:mt-1 p-2 relative">
            <div className="font-[350]">{post.content}</div>
            <PostOptionsBar token = {decodedToken} post = {post} />
            <CommentSection post = {post}/>
          </div>
          <div
            id="sidebar"
            className="md:w-[35%] p-1 border-l-[1px] border-black border-opacity-40"
          >
            <MiniAccountTab post={post}/>
            {(windowsize >= 768)&&(<div>
            <div className="text-xl font-medium">
               Other user details</div>
            </div>)}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
