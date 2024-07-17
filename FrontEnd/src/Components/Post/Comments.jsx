import axios from "axios";
import CommentTextarea from "./CommentTextarea";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { baseurl } from "../../routes";

export default function Comments(props) {
  const comments = props.comments;
  const [editComment, setEditComment]= useState();
  const setTextArea = props.setTextArea;
  const token = props.token;
  const [showEdit, setShowEdit] = useState(false);

  const drawSubComments = (subComment) => {
    return (
      <div key={subComment} id={subComment} className="p-[2px] ml-1 text-sm">
        {subComment}
      </div>
    );
  };

  const drawComments = (comment) => {

    return (
      <div key={comment.id} id={comment.id} className="p-1 text-base bg-black bg-opacity-50 mb-1 rounded-xl">
        <div
          className="p-1"
        >
          <div>{comment?.user?.username}</div>
          <div>{comment.content}</div>
            {(token?.sub === comment.user?.id)&&(
            <div className="p-1 flex flex-row text-sm">
            <div
            className="hover:cursor-pointer hover:text-[#f29260] mx-1"
            onClick={()=>{
              setEditComment(comment);
              setShowEdit(!showEdit);
            }}
            >Edit</div>
            <div 
            className="mx-1 hover:cursor-pointer hover:text-[#f29260]"
            onClick={()=>{
              axios.delete(`${baseurl}/comments/${comment.id}`)
              .then(()=>alert("deleted comment succesfully"))
              .catch(()=>alert("failed to delete comment"));
            }}
            >Delete</div>
          </div>)}
        </div>
        <div
          id={comment.Comment + "-subcomments"}
          className="hidden bg-black bg-opacity-60 rounded-xl"
        >
        </div>
      </div>
    );
  };

  return (
    <div>
    <div className="flex flex-col p-1 bg-black bg-opacity-50 rounded-xl text-white font-thin">
      {comments.map(drawComments)}
    </div>
    {showEdit &&(
      <div className="fixed bottom-0 h-[200px] w-full z-50 backdrop-blur-xl flex flex-col">
        <div>
          <div
          className="hover:cursor-pointer"
          onClick={()=>setShowEdit(false)}
          ><FontAwesomeIcon icon={faX}/></div>
        <div className="flex flex-col p-1 bg-black bg-opacity-50 rounded-xl text-white font-thin">
          <div className="p-1 text-base bg-black bg-opacity-50 mb-1 rounded-xl">{editComment?.content}</div>
          </div>
          </div>
        <CommentTextarea showEdit={showEdit} setShowEdit={setShowEdit} editComment={editComment} setEditComment = {setEditComment}/>
      </div>
    )}
    </div>
  );
}
