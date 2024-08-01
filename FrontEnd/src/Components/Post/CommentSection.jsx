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
  const { token } = useContext(UserContext);
  const [decodedToken, setDecodedToken] = useState();
  const [rendering, setRendering] = useState(true);
  const comments = props.comments;
  const setComments = props.setComments;
  const [textArea, setTextArea] = useState("");
  const unsubscribe = () => {
    axios.get(`${baseurl}/comments/post/${post.id}`).then((com) => {
      setComments(com.data);
      setRendering(false);
    });
  };

  useEffect(() => {
    axios
      .post(`${baseurl}/auth/decode`, {
        access_token: token?.data?.access_token,
      })
      .then((dToken) => {
        setDecodedToken(dToken.data);
      })
      .catch((err) => {
        alert("could not decode user token, please login in");
      });
    unsubscribe();
  }, []);
  if (rendering) {
    return (
      <div>
        <div className="p-1 text-lg font-medium">Comment Section</div>
        <div className="flex items-center justify-center">
          <FontAwesomeIcon icon={faSpinner} className=" animate-spin" />
        </div>
      </div>
    );
  }
  return (
    <div id="commentSection" className=" overflow-y-scroll">
      <div className="p-1 text-lg font-medium">Comment Section</div>
      <div id="commentsList">
        <Comments
          token={decodedToken}
          setTextArea={setTextArea}
          comments={comments}
          post={post}
          setComments={setComments}
        />
      </div>
      {token && (
        <CommentTextarea
          comments={comments}
          setComments={setComments}
          textArea={textArea}
          setTextArea={setTextArea}
          token={decodedToken}
          post={post}
        />
      )}
    </div>
  );
}
