import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl, get, post } from "../services/Endpoint";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Blog() {
  const { id: postId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [singlePost, setSinglePost] = useState(null);
  const [comment, setComment] = useState("");
  const [loaddata, setLoaddata] = useState(false);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const request = await get(`/public/Singlepost/${postId}`);
        const response = request.data;
        setSinglePost(response.Post);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost();
  }, [loaddata, postId]);

  const onSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first");

    try {
      const response = await post("/comment/addcomment", {
        comment,
        postId,
        userId: user._id,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setComment("");
        setLoaddata((prev) => !prev);
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Unexpected error";
      toast.error(msg);
    }
  };

  if (!singlePost) {
    return <div className="text-center my-5 text-muted">Loading post...</div>;
  }

  return (
    <div
      className="container py-5 px-3"
      style={{ maxWidth: "900px", backgroundColor: "#f0f2f5" }}
    >
      {/* Post Title */}
      <h1 className="fw-bold mb-4 display-4 text-dark">{singlePost.title}</h1>

      {/* Post Image */}
      <img
        src={singlePost.image}
        alt="Post"
        className="img-fluid mb-4 rounded"
        style={{ maxHeight: "500px", objectFit: "cover", width: "100%" }}
      />

      {/* Post Description */}
      <p
        className="mb-5 "
        style={{ fontSize: "1.3rem", lineHeight: "1.8", fontWeight: "500" }}
      >
        {singlePost.desc}
      </p>

      <hr />

      {/* Comment Form */}
      <h3 className="mt-5 mb-4 text-dark">Leave a Comment</h3>
      <form onSubmit={onSubmitComment}>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="comment"
            rows="4"
            style={{ minHeight: "120px" }}
            placeholder="Write your comment here"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          Submit Comment
        </button>
      </form>

      <hr />

      {/* Comments Section */}
      <h3 className="mt-5 mb-4 text-dark">Comments</h3>
      {singlePost.comments && singlePost.comments.length > 0 ? (
        singlePost.comments.map((elem, idx) => (
          <div
            key={idx}
            className="d-flex align-items-start p-3 mb-4 rounded "
            style={{ backgroundColor: "#999999" }}
          >
            <img
              src={
                elem.userId?.profile
                  ? `${BaseUrl}/images/${elem.userId.profile}`
                  : ""
              }
              alt="User"
              className="rounded-circle me-3"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                border: "1px solid #ccc",
              }}
            />
            <div>
              <h6 className="fw-semibold mb-1 text-dark">
                {elem.userId?.FullName || "Unknown User"}
              </h6>
              <p className="mb-0 ">{elem.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">No comments yet.</p>
      )}
    </div>
  );
}
