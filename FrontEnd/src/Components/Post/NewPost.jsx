import {
  faPlus,
  faSpinner,
  faUpload,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../Accounts/UserContext";
import { baseurl } from "../../routes";
import { useNavigate } from "react-router-dom";

export default function NewPost(props) {
  const { token } = useContext(UserContext);
  const community = props.community;
  const navigate = useNavigate();
  const [makePost, setMakePost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");
  const [display, setDisplay] = useState(
    <div className="p-2 h-[250px] w-[250px] flex flex-col bg-black bg-opacity-65 rounded-xl items-center justify-center border-[1px] border-white border-opacity-20">
      <FontAwesomeIcon icon={faSpinner} className="text-3xl animate-spin" />
      <div>uploading post</div>
    </div>
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${baseurl}/auth/decode`, {
        access_token: token?.data?.access_token,
      })
      .then((decodedToken) => {
        axios
          .post(`${baseurl}/posts`, {
            user: { id: decodedToken.data.sub },
            community: { id: community.id },
            content: post,
          })
          .then((newPost) => {
            setDisplay(
              <div className="p-2 h-[300px] w-[300px] flex flex-col bg-black bg-opacity-65 rounded-xl items-center justify-center border-[1px] border-white border-opacity-20">
                Posted added successfully
              </div>
            );
            setPost("");
            navigate(`/communities/CommunityPage/${community.id}`);
          })
          .catch(() =>
            setDisplay(
              <div className="p-2 text-[#ff0000] h-[300px] w-[300px] flex flex-col bg-black bg-opacity-65 rounded-xl items-center justify-center border-[1px] border-white border-opacity-20">
                Error when uploading post
              </div>
            )
          );
      })
      .catch(() =>
        setDisplay(
          <div className="p-2 text-[#ff0000] h-[300px] w-[300px] flex flex-col bg-black bg-opacity-65 rounded-xl items-center justify-center border-[1px] border-white border-opacity-20">
            Error when decoding user token
          </div>
        )
      );
  };

  if (!makePost) {
    return (
      <div
        onClick={() => setMakePost(!makePost)}
        className="fixed bottom-20 right-5 hover:cursor-pointer bg-black flex items-center justify-center w-10 h-10 bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-xl font-medium text-white"
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    );
  }

  return (
    <div className="fixed flex items-center justify-center h-full w-full backdrop-blur-md">
      {loading ? (
        <div className="p-4 w-[60%] flex flex-col items-center text-white ">
          <div
            onClick={() => setMakePost(!makePost)}
            className="bg-black absolute top-5 left-5 flex hover:cursor-pointer items-center justify-center w-10 h-10 bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-xl font-medium text-white"
          >
            <FontAwesomeIcon icon={faX} />
          </div>
          <div>{display}</div>
        </div>
      ) : (
        <div className="p-4 w-[60%] flex flex-col items-center text-white ">
          <div
            onClick={() => setMakePost(!makePost)}
            className="bg-black absolute top-5 left-5 flex hover:cursor-pointer items-center justify-center w-10 h-10 bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-xl font-medium text-white"
          >
            <FontAwesomeIcon icon={faX} />
          </div>
          <form
            className="p-2 h-full flex flex-col bg-black bg-opacity-25 rounded-xl items-center justify-center placeholder:text-center border-[1px] border-white border-opacity-20"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row w-full items-center justify-center bg-black bg-opacity-65 rounded-xl mb-1">
              <label htmlFor="post"></label>
              <textarea
                className="bg-transparent w-[340px] h-[340px] sm:w-[500px] md:w-[600px] sm:h-[400px] text-sm text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 rounded-xl outline-none border-none border-0 border-opacity-0"
                id="post"
                placeholder="Post something in the community"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              ></textarea>
            </div>
            <button
              className="bg-black w-16 h-10 block bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
              type="submit"
            >
              <FontAwesomeIcon icon={faUpload} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
