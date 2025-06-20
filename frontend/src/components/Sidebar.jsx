import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaUsers,
  FaListAlt,
  FaPlusSquare,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100" style={{ width: "250px" }}>
      <div className="p-3">
        <h4 className="text-white mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/dashboard" className="nav-link text-white">
              <FaHome className="me-2" /> Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/dashboard/addpost" className="nav-link text-white">
              <FaPlusSquare className="me-2" /> Add Post
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/dashboard/users" className="nav-link text-white">
              <FaUsers className="me-2" /> Users
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/dashboard/allposts" className="nav-link text-white">
              <FaListAlt className="me-2" /> All Posts
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
