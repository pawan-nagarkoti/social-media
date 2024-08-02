import React from "react";
import { LikeIcon, UnlikeIcon, BookmarkIcon, SelectectedBookmarkIcon, Comment, Close } from "../assets/icons/icon";
import { PostCarousel, Button } from "../components";
import { DateConvertToDays } from "../utils/helper";
import { useNavigate } from "react-router-dom";

export default function PostContainer({ item, getDeletedPostId }) {
  const navigate = useNavigate();

  // This function is used for set updated post id on localstorage and redirect to the updated post page.
  const handleUpdatePostId = (updatedPostId) => {
    localStorage.setItem("updatedPostId", updatedPostId);
    navigate("/update-post");
  };

  return (
    <div className="card" style={{ maxWidth: "345px", borderRadius: "12px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}>
      <div className="card-header d-flex align-items-center justify-content-between">
        <div className="d-flex">
          <img
            src={item?.author?.account?.avatar?.url ? item?.author?.account?.avatar?.url : `http://via.placeholder.com/640x360`}
            alt="avatar"
            className="rounded-circle me-3"
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            <h6 className="m-0">{item?.author?.account?.username}</h6>
            <small>{item?.author?.location}</small>
          </div>
        </div>

        <div className="cursor" onClick={() => getDeletedPostId(item._id)}>
          <Close />
        </div>
      </div>

      <PostCarousel carouselData={item?.images} carouselId={item._id} />

      <div className="card-body">
        <div style={{ height: "2.8rem", overflow: "hidden", fontSize: ".9rem" }}>{item?.content}</div>
        {item?.tags.length > 0 && (
          <p className="card-text d-flex gap-2 flex-wrap">
            {item?.tags.map((item, index) => (
              <span key={index}>#{item}</span>
            ))}
          </p>
        )}
        <small className="text-muted">{item?.likes} likes</small>
        &nbsp;
        <small className="text-muted">{item?.comments} comments</small>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <div>{true ? <LikeIcon className="me-3" /> : <UnlikeIcon className="me-3" />}</div>
          <Comment className="me-3" />
        </div>
        <div>{false ? <BookmarkIcon className="me-3" /> : <SelectectedBookmarkIcon />}</div>
      </div>
      <div className="px-3 pb-3">
        <small className="text-muted">{DateConvertToDays(item?.updatedAt)} days ago</small>
      </div>
      <Button className="btn-primary" onClick={() => handleUpdatePostId(item?._id)}>
        Update This Post
      </Button>
    </div>
  );
}
