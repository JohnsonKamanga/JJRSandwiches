import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";
import CommentSection from "./CommentSection";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import MiniAccountTab from "../Accounts/MiniAccountTab";
import PostOptionsBar from "./PostOptionsBar";
import Comments from "./Comments";
import { useEffect, useState } from "react";

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
const post =
  "JJRSandwiches is a platform for appreciating sandwiches. You can post recipes," +
  " communicate with other users in communities as you appreciate sandwiches." +
  " It is already quite clear from my nitial statement that we will repuire multiple frameworks for the backend of the web app" +
  " for the messaging/commenting in communities i will use nodeJS due to its asychronous nature eg it is nonblocking" +
  ". Other options for this include Erlang, Elixir. They are options but there will be a learning curve. Websocket is " +
  "involved in this part of the application. Websocket is an a protocol that uses tcp ";
"to establish a connection and then maintains the same connection until one of the " +
  "communicating devices terminates the connection. It is used in the client-server communication setup" +
  "As for keeping track of recipes and user data, i plan on usig django with restful framework." +
  ". Since a restful api will be used, HTTP will be the protocol for these parts of the app" +
  ". These will be intergrated into the system using microservices architecture.";

export default function ViewPost() {
  const [windowsize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));
    return window.removeEventListener("resize", () => {
      console.log("removing resize listener");
    });
  }, [windowsize]);
  return (
    <div>
      <div className="min-h-full h-screen">
        <NavBar />
        <div className="min-h-full h-screen flex flex-col md:flex-row">
          <div id="post" className="md:w-[65%] mt-[35px] md:mt-1 p-2 relative">
            <div className="font-[350]">{post}</div>
            <PostOptionsBar />
            <CommentSection/>
          </div>
          <div
            id="sidebar"
            className="md:w-[35%] p-1 border-l-[1px] border-black border-opacity-40"
          >
            <MiniAccountTab />
            {(windowsize >= 768)&&(<div>
            <div className="text-xl font-medium"> Trending Comments</div>
            <Comments avaiableComments={myComments}/>
            </div>)}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
