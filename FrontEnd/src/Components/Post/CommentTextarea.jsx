import {
  faPaperPlane,
  faSpinner,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { baseurl } from "../../routes";

export default function CommentTextarea(props) {
  const token = props.token;
  const post = props.post;
  const editComment = props.editComment;
  const setEditComment = props.setEditComment;
  const comments = props.comments;
  const setComments = props.setComments;
  const [loading, setLoading] = useState(false);
  const textArea = props.textArea;
  const setTextArea = props.setTextArea;
  const showEdit = props.showEdit;
  const setShowEdit = props.setShowEdit;
  const [display, setDisplay] = useState(
    <div className="flex flex-col justify-center items-center">
      <FontAwesomeIcon className="animate-spin text-3xl" icon={faSpinner} />
      <div className="text-lg">Loading...</div>
    </div>
  );
  const [comment, setComment] = useState(
    editComment ? editComment.content : ""
  );
  const handleEdit = (e) => {
    e.preventDefault();
    setDisplay(
      <div className="flex flex-col justify-center items-center">
        <FontAwesomeIcon className="animate-spin text-3xl" icon={faSpinner} />
        <div className="text-lg">Loading...</div>
      </div>
    );
    setLoading(true);
    const xButton = document.getElementById("xButtonEdit");

    axios
      .put(`${baseurl}/comments/${editComment?.id}`, {
        content: comment,
      })
      .then(async (res) => {
        if (xButton) xButton.style.display = "flex";
        setComments(
          (await axios.get(`${baseurl}/comments/post/${post.id}`)).data
        );
        setDisplay(<div>Comment updated</div>);
        setComment("");
      })
      .catch((err) => {
        if (xButton) xButton.style.display = "flex";
        setDisplay(
          <div className="text-[#ff0000]">
            Comment could not be updated: {`${err.code} - ${err.message}`}
          </div>
        );
        console.error(err);
      });
    setEditComment();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplay(
      <div className="flex flex-col justify-center items-center">
        <FontAwesomeIcon className="animate-spin text-3xl" icon={faSpinner} />
        <div className="text-lg">Loading...</div>
      </div>
    );
    setLoading(true);
    const xButton = document.getElementById("xButton");
    axios
      .post(`${baseurl}/comments`, {
        content: comment,
        user: { id: token.sub, username: token.username },
        post: {
          id: post.id,
        },
      })
      .then((newComment) => {
        xButton.style.display = "flex";
        setDisplay(<div>Comment added</div>);
        setComments([...comments, newComment.data]);
        setComment("");
      })
      .catch((err) => {
        xButton.style.display = "flex";
        setDisplay(
          <div className="text-[#ff0000]">
            Comment could not be added: {`${err.code} - ${err.message}`}
          </div>
        );
        console.error(err);
      });
  };

  if (showEdit) {
    return loading ? (
      <div className="fixed z-50 top-0 h-full w-full">
        <div
          onClick={() => {
            setLoading(!loading);
            setShowEdit(false);
          }}
          id="xButtonEdit"
          className="fixed z-50 top-16 left-5 hover:cursor-pointer bg-black flex items-center justify-center w-10 h-10 bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-xl font-medium text-white"
        >
          <FontAwesomeIcon icon={faX} />
        </div>
        <div className="absolute backdrop-blur-lg text-white top-0 left-0 min-w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-25 ">
          <div className=" h-[300px] w-[300px] flex flex-col bg-black bg-opacity-65 rounded-xl items-center justify-center border-[1px] border-white border-opacity-20">
            {display}
          </div>
        </div>
      </div>
    ) : (
      <div className="z-50 flex flex-col mt-5 w-[100%] md:w-[62%] p-2">
        <div className="flex flex-col p-1 bg-black bg-opacity-30 rounded-xl text-white">
          <div
            onClick={() => {
              setLoading(!loading);
              setShowEdit(false);
            }}
            id="xButtonEdit"
            className="fixed z-50 top-16 left-5 hover:cursor-pointer bg-black flex items-center justify-center w-10 h-10 bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-xl font-medium text-white"
          >
            <FontAwesomeIcon icon={faX} />
          </div>
          <div className="h-fit w-full flex-col p-2">
            <div className="p-2 min-h-[150px] font-thin text-base bg-black bg-opacity-50 mb-1 rounded-md">
              {editComment?.content}
            </div>
          </div>

          <form
            onSubmit={handleEdit}
            className="flex text-black items-center justify-center p-2"
          >
            <textarea
              name="commentBox"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="p-2 font-normal mr-1 text-sm rounded-lg w-full border-black border-[1px] border-opacity-60 outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-black p-3 pr-[21px] block bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 rounded-l-md rounded-r-full font-medium text-white"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => {
          document.getElementById("xButton").style.display = "none";
          setLoading(!loading);
        }}
        id="xButton"
        className="fixed z-50 top-16 left-5 hover:cursor-pointer bg-black hidden items-center justify-center w-10 h-10 bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-xl font-medium text-white"
      >
        <FontAwesomeIcon icon={faX} />
      </div>
      {loading ? (
        <div className="absolute backdrop-blur-lg text-white top-0 left-0 min-w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-25 ">
          <div className=" h-[300px] w-[300px] flex flex-col bg-black bg-opacity-65 rounded-xl items-center justify-center border-[1px] border-white border-opacity-20">
            {display}
          </div>
        </div>
      ) : (
        <div className="fixed bottom-10 w-[100%] md:w-[62%]">
          <form onSubmit={handleSubmit} className="flex items-center">
            <textarea
              name="commentBox"
              placeholder="comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="p-1 font-thin text-sm rounded-lg w-[90%] border-black border-[1px] border-opacity-30 outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-black ml-[2px] p-3 pr-[21px] block bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 rounded-l-md rounded-r-full font-medium text-white"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
