import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../services/Endpoint.js";

function Recentpost() {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  const handlenavigate = (id) => {
    navigate(`/post/${id}`);
  };

  const getpost = async () => {
    try {
      const response = await get("/blog/getposts");
      setPost(response.data.posts);
    } catch (error) {}
  };

  useEffect(() => {
    getpost();
  }, []);

  return (
    <div className="container ">
      <h2 className="fw-bold display-5 text-center mb-5">All Posts</h2>

      {post &&
        post.map((postItem) => (
          <div
            className="d-flex mb-4 pb-4 border-bottom"
            style={{ cursor: "pointer" }}
            key={postItem._id}
            onClick={() => handlenavigate(postItem._id)}
          >
            <img
              src={postItem.image}
              alt={postItem.title}
              style={{
                width: "180px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                marginRight: "20px",
              }}
            />

            <div className="flex-grow-1">
              <h5 className="fw-bold">{postItem.title}</h5>
              <div className="text-muted small mb-2">
                {new Date(postItem.createdAt).toLocaleString()}
              </div>
              <p className="mb-1 text-muted" style={{ lineHeight: "1.6" }}>
                {postItem.desc.slice(0, 150)}...{" "}
                <span className="text-primary">Read more</span>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Recentpost;
