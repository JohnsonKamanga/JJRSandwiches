import CommentTextarea from "./CommentTextarea";
import Comments from "./Comments";

const avaiableComments = [
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
  ];

export default function CommentSection() {
  return (
    <div className="p-1 overflow-y-scroll">
      <div className="p-1 text-lg font-medium">Comment Section</div>
      <Comments avaiableComments={avaiableComments} />
      <CommentTextarea />
    </div>
  );
}
