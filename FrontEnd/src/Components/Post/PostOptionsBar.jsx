import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { baseurl } from "../../routes";

export default function PostOptionsBar(props) {
  const post = props.post;
  const token = props.token;
  return (
    <div className="p-[1px] text-white flex flex-row mt-2 justify-between border-y-[1px] border-black border-opacity-30">
      <div 
      onClick={()=>{
        axios.put(`${baseurl}/posts/${post.id}`,{
          likes: post.likes + 1,
        })
        .then(()=>alert("like added"))
        .catch(()=>alert("like could not be added"));
      }}
      className="hover:cursor-pointer hover:bg-black hover:bg-opacity-65 rounded-lg p-2">
        <FontAwesomeIcon icon={faThumbsUp} className="mx-1" />
        <span className="font-[200]">{post.likes}</span>
      </div>
      <div className="hover:cursor-pointer hover:bg-black hover:bg-opacity-65 rounded-lg p-2">
        <FontAwesomeIcon icon={faComment} className="mx-1" />
        <span className="font-[200]">Comment</span>
      </div>
      <div className="hover:cursor-pointer hover:bg-black hover:bg-opacity-65 rounded-lg p-2">
        <FontAwesomeIcon icon={faShare} className="mx-1" />
        <span className="font-[200]">Share</span>
      </div>
    </div>
  );
}
