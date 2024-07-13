import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function CommentTextarea() {
  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
