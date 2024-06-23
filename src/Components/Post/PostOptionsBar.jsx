import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PostOptionsBar() {
  return (
    <div className="p-1 flex flex-row mt-2 justify-between border-y-[1px] border-black border-opacity-30">
      <div className="hover:cursor-pointer hover:bg-black hover:bg-opacity-50 rounded-lg p-2">
        <FontAwesomeIcon icon={faThumbsUp} className="mx-1" />
        <span>Like</span>
      </div>
      <div className="hover:cursor-pointer hover:bg-black hover:bg-opacity-50 rounded-lg p-2">
        <FontAwesomeIcon icon={faComment} className="mx-1" />
        <span>Comment</span>
      </div>
      <div className="hover:cursor-pointer hover:bg-black hover:bg-opacity-50 rounded-lg p-2">
        <FontAwesomeIcon icon={faShare} className="mx-1" />
        <span>Share</span>
      </div>
    </div>
  );
}
