import { faPlus, faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../Accounts/UserContext";
import { baseurl } from "../../routes";

export default function NewPost(props) {
  const { token } = useContext(UserContext);
  const community = props.community;
  const posts = props.posts;
  const [makePost, setMakePost] = useState(false);
  const [post, setPost] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
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
          .then((newPost) =>{ 
            posts.push(newPost.data);
            alert("post added");
            setMakePost(false);
        })
          .catch(() => alert("error when uploading post"));
      })
      .catch(() => alert("error when decoding user token"));
  };

  if (!makePost) {
    return (
      <div
        onClick={() => setMakePost(!makePost)}
        className="fixed bottom-20 right-5 h-10 w-10 flex items-center justify-center hover:cursor-pointer bg-red-400 rounded-xl"
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    );
  }

  return (
    <div className="fixed h-full w-full backdrop-blur-md">
      <div
        onClick={() => setMakePost(!makePost)}
        className="bg-gray-400 flex items-center justify-center h-10 w-10 rounded-xl hover:cursor-pointer"
      >
        <FontAwesomeIcon icon={faX} />
      </div>
      <form 
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit}>
        <label htmlFor="post"></label>
        <textarea
        className="w-[400px] h-[100px]"
          id="post"
          placeholder="Post something in the community"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        <button 
        className="bg-red-400 w-10 h-10 rounded-lg"
        type="submit">
            <FontAwesomeIcon icon={faUpload}/>
        </button>
      </form>
    </div>
  );
}
