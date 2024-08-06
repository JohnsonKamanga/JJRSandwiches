import axios from "axios";
import CommentTextarea from "./CommentTextarea";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faX, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { baseurl } from "../../routes";
import DefaultProfilePicture from "../Accounts/default-user-picture.jpg";

export default function Comments(props) {
  const comments = props.comments;
  const [editComment, setEditComment] = useState();
  const setTextArea = props.setTextArea;
  const token = props.token;
  const post = props.post;
  const setComments = props.setComments;
  const [targetComment, setTargetComment] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [display, setDisplay] = useState(
    <div className="flex flex-col justify-center items-center">
      <FontAwesomeIcon className="animate-spin text-3xl" icon={faSpinner} />
      <div className="text-lg">Deleting comment...</div>
    </div>
  );

  const drawComments = (comment) => {
    const time = new Date(comment.commentedAt).toLocaleTimeString();
    const timestamp = time.slice(0, 4) + time.slice(7);
    const elementID = `Comment-${comment.id}`;
    return (
      <div
      id={elementID}
        key={comment.id}
        className="p-1 text-sm sm:text-base border-black border-[1px] border-opacity-20 bg-gray-600 bg-opacity-70 mb-1 rounded-xl"
      >
        <div className="p-1">
          <div className="flex items-center">
            <div className="h-[28px] w-[28px] flex items-center justify-center rounded-full bg-black bg-opacity-65 mr-2">
              <img
                id={`${comment.id}`}
                src={
                  comment?.user?.profilePicture && comment?.user?.profilePicture != '' ?
                  comment?.user?.profilePicture
                  :
                  DefaultProfilePicture
                }
                className="rounded-full h-[20px]"
              />
            </div>
            <div className="flex w-full justify-between items-center">
              <div>{comment?.user?.username}</div>
              <div className=" text-end text-sm font-light p-1">
                {timestamp}
              </div>
            </div>
          </div>
          <div className="pl-1">{comment.content}</div>
          {token?.sub === comment.user?.id && (
            <div className="p-1 flex flex-row text-xs sm:text-sm">
              <div
                className="hover:cursor-pointer hover:text-[#f29260] mx-1"
                onClick={() => {
                  setEditComment(comment);
                  setShowEdit(!showEdit);
                }}
              >
                Edit
              </div>
              <div
                className="mx-1 hover:cursor-pointer hover:text-[#f29260]"
                onClick={() => {
                  const element = document.getElementById(elementID);
                  const deletePopUp =
                    document.getElementById("deleteConfirmation");
                  if (element && deletePopUp) {
                    setTargetComment(comment)
                    //deletePopUp.style.top = `${element.offsetTop}px`;
                    deletePopUp.style.display = "flex";
                  }
                }}
              >
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col p-1 min-h-[310px] rounded-xl text-white font-thin">
        {comments.map(drawComments)}
      </div>
      {showEdit && (
        <div className="fixed top-0 left-0 p-2 h-full w-full z-50 backdrop-blur-xl flex flex-col items-center justify-center">
          
          <CommentTextarea
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            editComment={editComment}
            setEditComment={setEditComment}
            post={post}
            setComments={setComments}
          />
        </div>
      )}
      <div>
      <div
            className="fixed text-white hidden flex-col items-center min-h-[20%] md:min-h-[30%] p-2 z-40 w-full top-0 left-0 bg-black bg-opacity-75 backdrop-blur-lg"
            id="deleteConfirmation"
          >
            <div className="mt-10 flex flex-col justify-center items-center">
              <p className="text-2xl">
                Are you sure you want do delete this comment ?
              </p>
              <div className="flex flex-row mt-3">
                <div
                  className="p-2 h-fit text-xl mx-1 hover:cursor-pointer hover:text-[#f87058] bg-black bg-opacity-30 border-[1px] border-white border-opacity-20 rounded-md"
                  onClick={() => {
                    const element = document.getElementById("deleteLoadingScreen");
                    document.getElementById("deleteConfirmation").style.display="none";
                    setDisplay(
                      <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-white bg-opacity-35 rounded-lg text-white">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin text-4xl"
                        />
                        <div className="text-xl">Deleting...</div>
                      </div>
                    );
                    if(element)
                      element.style.display="flex";
                      axios
                        .delete(`${baseurl}/comments/${targetComment.id}`)
                        .then(async(res) => {
                          setComments((await axios.get(`${baseurl}/comments/post/${post.id}`)).data);
                          setDisplay(
                            <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-white bg-opacity-35 rounded-lg text-white">
                        <div className="text-xl">Comment deleted</div>
                      </div>
                          )
                        })
                        .catch((err) => {
                          setDisplay(
                            <div className="flex flex-col items-center justify-center h-[250px] w-[250px] bg-black bg-opacity-65 rounded-lg">
                              <div className="text-xl text-[#ff0000]">
                                {err.message + " : " + err.code}
                              </div>
                            </div>
                          );
                        });
                  }}
                >
                  Yes
                </div>
                <div
                  className="p-2 h-fit text-xl mx-1 hover:cursor-pointer hover:text-[#f87058] bg-black bg-opacity-30 border-[1px] border-white border-opacity-20 rounded-md"
                  onClick={() => {
                    const element =
                      document.getElementById("deleteConfirmation");
                    if (element) {
                      element.style.display = "none";
                    }
                  }}
                >
                  No
                </div>
              </div>
            </div>
          </div>
      </div>
      <div 
      id="deleteLoadingScreen"
      className="absolute backdrop-blur-lg text-white top-0 left-0 min-w-full h-full hidden flex-col justify-center items-center bg-black bg-opacity-25 ">
          <div 
            className="bg-black absolute top-5 left-5 flex hover:cursor-pointer items-center justify-center w-10 h-10 bg-opacity-80 hover:text-[#f87058] hover:bg-opacity-90 border-[1px] border-black  transition-all duration-200 p-2 rounded-xl font-medium text-white"
            onClick={()=>{
              const loadingPopUp = document.getElementById("deleteLoadingScreen");
              const deletePopUp = document.getElementById("deleteConfirmation");
              if(loadingPopUp && deletePopUp){
                loadingPopUp.style.display = "none";
                deletePopUp.style.display = "none";
              }
            }}
            >
              <FontAwesomeIcon icon={faX}/>
            </div>
          <div className=" h-[300px] w-[300px] flex flex-col bg-black bg-opacity-65 rounded-xl items-center justify-center border-[1px] border-white border-opacity-20">
            {display}
          </div>
        </div>
    </div>
  );
}
