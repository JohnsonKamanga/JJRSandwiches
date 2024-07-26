import {
  faArrowLeftLong,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { baseurl } from "../../routes";

export default function MiniAccountTab(props) {
  const post = props.post;
  const navigate = useNavigate();
  const [windowsize, setWindowSize] = useState(window.innerWidth);
  const getImage = (user) => {
    axios
      .get(`${baseurl}/users/profile-picture/${user.username}`, {
        responseType: "blob",
      })
      .then((pic) => {
        document.getElementById(`${user.id}`).src = URL.createObjectURL(
          pic.data
        );
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));
    return window.removeEventListener("resize", () => {
      console.log("removing resize listener");
    });
  }, [windowsize]);
  if (windowsize < 768)
    return (
      <div>
        <div className="transition-all duration-200 flex flex-row items-center w-[98%] text-xl ">
          <div
            onClick={() => {
              navigate(-1);
            }}
          >
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              className="mr-1 text-lg hover:bg-black transition-all duration-150 bg-opacity-0 hover:bg-opacity-40 rounded-full p-2 hover:cursor-pointer"
            />
          </div>
          <div className="flex items-center p-2 font-extralight rounded-[20px]">
            <div className="flex flex-row items-center justify-center rounded-full p-[2px] w-[35px] h-[35px] bg-black bg-opacity-40">
              <img
                id={post.user.id}
                onLoad={getImage(post.user)}
                className="h-fit rounded-full "
              />
            </div>
            <NavLink to="/ViewAccount" className="flex items-center">
              <span className="mx-2 hover:cursor-pointer text-[17px] transition-all duration-100 font-medium hover:font-bold">
                {" "}
                {post?.user?.username}{" "}
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    );

  return (
    <div className="h-full  bg-black bg-opacity-65">
      <div className="flex flex-col h-full text-white items-center p-2">
        <div className="w-[160px] p-2 h-[160px] lg:w-[200px] lg:h-[200px] rounded-full bg-white bg-opacity-45 flex justify-center items-center text-center">
          {" "}
          <img
            id={post.user.id}
            onLoadStart={getImage(post.user)}
            className="h-fit rounded-full "
          />
        </div>
        <div className="p-2 mt-2 flex flex-col  w-[95%] min-h-[245px] rounded-[16px] items-center justify-center text-xl bg-white bg-opacity-40">
          <div className="flex flex-row w-[400px] items-center bg-black bg-opacity-65 rounded-xl mb-1">
            <div className="w-[120px] font-medium text-white text-end p-2 border-r-[1px]">
              Username{" "}
            </div>
            <div
              className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]"
              to="/AccountPage"
            >
              {post?.user?.username}
            </div>
          </div>
          <div className="flex flex-row w-[400px] items-center bg-black bg-opacity-65 rounded-xl mb-1">
            <div className="w-[120px] font-medium text-white text-end p-2 border-r-[1px]">
              Bio{" "}
            </div>
            <div className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]">
              {post.user.bio}
            </div>
          </div>
          <div className="flex flex-row w-[400px] items-center bg-black bg-opacity-65 rounded-xl mb-1">
            <div className="w-[120px] font-medium text-white text-end p-2 border-r-[1px]">
              Location{" "}
            </div>
            <div className="bg-transparent text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 outline-none border-none border-0 border-opacity-0 rounded-r-[18px] w-[80%]">
              {post.user.location}
            </div>
          </div>
          <NavLink
            className="flex items-center justify-center bg-black w-36 h-10 bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-lg text-white"
            to="/AccountPage"
          >
            View Account
          </NavLink>
        </div>
      </div>
    </div>
  );
}
