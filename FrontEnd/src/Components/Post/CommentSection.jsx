import { useContext, useEffect, useState } from "react";
import CommentTextarea from "./CommentTextarea";
import Comments from "./Comments";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../Accounts/UserContext";
import { baseurl } from "../../routes";

export default function CommentSection(props) {
  const post = props.post;
  const {token} = useContext(UserContext);
  const [decodedToken, setDecodedToken] = useState();
  const [rendering, setRendering] = useState(true);
  const [comments, setComments] = useState([]);
  const [textArea, setTextArea] = useState('');

  useEffect(()=>{
    axios.post(`${baseurl}/auth/decode`,{access_token: token.data.access_token})
    .then((dToken)=>{
      setDecodedToken(dToken.data);
    });
    const unsubscribe = ()=>{
    axios.get(`${baseurl}/comments/post/${post.id}`)
    .then((com)=>{
        setComments(com.data);
        setRendering(false);
    })}

    return ()=>unsubscribe();
  },[comments]);
  if(rendering){
    return(
      <div>
        <FontAwesomeIcon icon={faSpinner} className=" animate-spin"/>
      </div>
    )
  }
  return (
    <div className="p-1 overflow-y-scroll">
      <div className="p-1 text-lg font-medium">Comment Section</div>
      <Comments token = {decodedToken} setTextArea = {setTextArea} comments={comments}/>
      <CommentTextarea textArea={textArea} setTextArea={setTextArea} token = {decodedToken} post = {post}/>
    </div>
  );
}
