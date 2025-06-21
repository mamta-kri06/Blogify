import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, delet, BaseUrl } from "../../services/Endpoint.js";

function Allpost() {
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const response = await delet(`/blog/delete/${id}`);
      if (response.status === 200) {
        setPost(post.filter((p) => p._id !== id));
        alert("Post deleted successfully");
      }
    } catch (error) {
      alert("Error deleting post");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-5 display-5">All Posts</h2>

      <div className="row">
        {post && post.length > 0 ? (
          post.map((postItem) => (
            <div className="col-md-4 mb-4" key={postItem._id}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "transform 0.3s",
                }}
              >
                <img
                  src={postItem.image}
                  alt={postItem.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{postItem.title}</h5>
                  <p
                    className="card-text text-muted"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {postItem.desc.slice(0, 150)}...
                  </p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary w-100 mb-2"
                      onClick={() => handlenavigate(postItem._id)}
                    >
                      Read Article
                    </button>
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => handleDelete(postItem._id)}
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Allpost;
