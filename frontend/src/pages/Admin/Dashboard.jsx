import React from "react";
import { useEffect } from "react";
import { FaUsers, FaRegNewspaper, FaComments } from "react-icons/fa";
import { get } from "../../services/Endpoint.js";
import { useState } from "react";

export default function Dashboard() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await get("/dashboard");
        const data = response.data;
        setPost(data.posts);
        setUser(data.users);
        setComment(data.comments);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    GetData();
  }, []);
  return (
    <div className="container py-4">
      <h2 className="mb-5 text-center fw-bold">📊 Admin Dashboard</h2>
      <div className="row g-4">
        {/* Total Users */}
        <div className="col-md-4 col-sm-6 col-12">
          <div
            className="card text-white shadow-sm border-0"
            style={{
              background: "linear-gradient(135deg, #1d2b64, #f8cdda)",
              borderRadius: "16px",
            }}
          >
            <div className="card-body text-center">
              <FaUsers size={32} className="mb-2" />
              <h5 className="card-title">Total users</h5>
              <p className="card-text display-6">{user && user.length}</p>
            </div>
          </div>
        </div>
        {/* Total Posts */}
        <div className="col-md-4 col-sm-6 col-12">
          <div
            className="card text-white shadow-sm border-0"
            style={{
              background: "linear-gradient(135deg, #4568dc, #b06ab3)",
              borderRadius: "16px",
            }}
          >
            <div className="card-body text-center">
              <FaRegNewspaper size={32} className="mb-2" />
              <h5 className="card-title">Total Posts</h5>
              <p className="card-text display-6">{post && post.length}</p>
            </div>
          </div>
        </div>
        {/* Total Comments */}
        <div className="col-md-4 col-sm-6 col-12">
          <div
            className="card text-white shadow-sm border-0"
            style={{
              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
              borderRadius: "16px",
            }}
          >
            <div className="card-body text-center">
              <FaComments size={32} className="mb-2" />
              <h5 className="card-title">Total Comments</h5>
              <p className="card-text display-6">{comment && comment.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
