import NavBar from "../HomePage/NavBar";
import CommentSection from "./CommentSection";
import MiniAccountTab from "../Accounts/MiniAccountTab";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Footer from "../HomePage/Footer";

export default function ViewPost() {
  const post = useLoaderData();
  const [count, setCount] = useState(0);
  const [windowsize, setWindowSize] = useState(window.innerWidth);
  const time = new Date(post.postedAt).toLocaleString();
  const timestamp = time.slice(0, 15) + time.slice(18);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));
    return window.removeEventListener("resize", () => {
      console.log("removing resize listener");
    });
  }, [windowsize]);

  return (
    <div>
      <div className="min-h-full h-screen">
        <NavBar />
        <div className=" bg-black bg-opacity-25  relative flex flex-col-reverse md:flex-row">
          <div id="post" className="md:w-[65%] rounded-xl mb-14 p-2">
            <div className="font-[350] text-white p-2 rounded-xl bg-black bg-opacity-65 min-h-[100px]">
              {post.content}
            </div>
            <div className=" text-end text-sm font-light p-2 border-b-[1px] border-black border-opacity-30">
              {timestamp}
            </div>
            <div
              onLoad={() => {
                if (count < 1) {
                  const commentTopHeight =
                    document.getElementById("commentSection").offsetTop;
                  const commentHeight =
                    document.getElementById("commentSection").offsetHeight;
                  const postHeight =
                    document.getElementById("post").offsetHeight;
                  const deltaHeight =
                    commentHeight + commentTopHeight - postHeight;
                  document.getElementById("post").style.height = `${
                    postHeight + deltaHeight
                  }px`;
                  setCount((count) => count + 1);
                }
              }}
              id="commentSection"
              className="h-fit"
            >
              <CommentSection post={post} />
            </div>
          </div>
          <div
            id="sidebar"
            className="md:w-[35%] border-l-[1px] border-black border-opacity-40"
          >
            <MiniAccountTab post={post} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
