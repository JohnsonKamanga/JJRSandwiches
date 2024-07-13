import CommentTextarea from "./CommentTextarea";

export default function Comments({avaiableComments}) {
  /*const avaiableComments = [
    {
      Comment: "comment1",
      subComments: {
        visible: false,
        subcomments: [
          "comment1-subcomment1",
          "comment1-subcomment2",
          "comment1-subcomment3",
          "comment1subcomment4",
        ],
      },
    },
    {
      Comment: "comment2",
      subComments: {
        visible: false,
        subcomments: [
          "comment2-subcomment1",
          "comment2-subcomment2",
          "comment2-subcomment3",
          "comment2-subcomment4",
        ],
      },
    },
    {
      Comment: "comment3",
      subComments: {
        visible: false,
        subcomments: [
          "comment3-subcomment1",
          "comment3-subcomment2",
          "comment3-subcomment3",
          "comment3-subcomment4",
        ],
      },
    },
    {
      Comment: "comment4",
      subComments: {
        visible: false,
        subcomments: [
          "comment4-subcomment1",
          "comment4-subcomment2",
          "comment4-subcomment3",
          "comment4-subcomment4",
        ],
      },
    },
    {
      Comment: "comment5",
      subComments: {
        visible: false,
        subcomments: [
          "comment5-subcomment1",
          "comment5-subcomment2",
          "comment5-subcomment3",
          "comment5-subcomment4",
        ],
      },
    },
    {
      Comment: "comment6",
      subComments: {
        visible: false,
        subcomments: [
          "comment6-subcomment1",
          "comment6-subcomment2",
          "comment6-subcomment3",
          "comment6-subcomment4",
        ],
      },
    },
  ];*/

  const drawSubComments = (subComment) => {
    return (
      <div key={subComment} id={subComment} className="p-[2px] ml-1 text-sm">
        {subComment}
      </div>
    );
  };

  const drawComments = (comment) => {
    return (
      <div key={comment.Comment} id={comment.Comment} className="p-1 text-base">
        <div
          onClick={() => {
            if (comment.subComments.visible) {
              document.getElementById(
                comment.Comment + "-subcomments"
              ).style.display = "none";
            } else {
              document.getElementById(
                comment.Comment + "-subcomments"
              ).style.display = "block";
            }

            comment.subComments.visible = !comment.subComments.visible;
          }}
          className="hover:cursor-pointer"
        >
          {comment.Comment}
        </div>
        <div
          id={comment.Comment + "-subcomments"}
          className="hidden bg-black bg-opacity-60 rounded-xl"
        >
          {comment.subComments.subcomments.map(drawSubComments)}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col p-1 bg-black bg-opacity-50 rounded-xl text-white font-thin">
      {avaiableComments.map(drawComments)}
    </div>
  );
}
