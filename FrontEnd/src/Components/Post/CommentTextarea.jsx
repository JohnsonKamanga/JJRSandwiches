import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { baseurl } from "../../routes";

export default function CommentTextarea(props) {
  const token = props.token;
  const post = props.post;
  const editComment = props.editComment;
  const setEditComment = props.setEditComment;
  const textArea = props.textArea;
  const setTextArea = props.setTextArea;
  const showEdit = props.showEdit;
  const setShowEdit = props.setShowEdit;
  const [comment, setComment] = useState("");
  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`${baseurl}/comments/${editComment?.id}`, {
        content: comment,
      })
      .then((newComment) => {
        alert("comment edited succesfully");
      })
      .catch((err) => {
        alert("comment unsuccesfully edited ");
        console.error(err);
      });
      setEditComment();
      setShowEdit(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseurl}/comments`, {
        content: comment,
        user: { id: token.sub, username: token.username },
        post: {
          id: post.id,
        },
      })
      .then((newComment) => {
        console.log("comment added succesfully");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if(showEdit){
    return (
      <div className="fixed z-50 bottom-10 w-[100%] md:w-[62%]">
        <form onSubmit={handleEdit} className="flex items-center">
          <textarea
            placeholder={editComment.content}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className="p-1 font-thin text-sm rounded-lg w-[90%] border-black border-[1px] border-opacity-30 outline-none"
          ></textarea>
          <button
            type="submit"
            className="p-3 pr-[21px] hover:p-[13px] hover:pr-[22px] ml-[2px] text-black text-opacity-90 flex transition-all duration-[400ms] items-center rounded-l-md rounded-r-full bg-[#f29260] hover:bg-[#f87058]"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed bottom-10 w-[100%] md:w-[62%]">
      <form onSubmit={handleSubmit} className="flex items-center">
        <textarea
          placeholder="comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          className="p-1 font-thin text-sm rounded-lg w-[90%] border-black border-[1px] border-opacity-30 outline-none"
        ></textarea>
        <button
          type="submit"
          className="p-3 pr-[21px] hover:p-[13px] hover:pr-[22px] ml-[2px] text-black text-opacity-90 flex transition-all duration-[400ms] items-center rounded-l-md rounded-r-full bg-[#f29260] hover:bg-[#f87058]"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}
