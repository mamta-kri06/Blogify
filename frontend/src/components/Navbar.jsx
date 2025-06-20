import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl, post } from "../services/Endpoint.js";
import { RemoverUser } from "../redux/AuthSlice.js";
import { persistor } from "../redux/Store.js";
import toast from "react-hot-toast";
import { FaBlog, FaHome, FaPlus } from "react-icons/fa";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await post("/auth/logout");
      if (response.status === 200) {
        dispatch(RemoverUser());
        await persistor.purge();
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="navbar d-flex justify-content-between align-items-center px-4 py-3 bg-dark shadow-sm"
      style={{ zIndex: 10 }}
    >
      {/* Left: Logo */}
      <div className="d-flex align-items-center gap-2">
        <FaBlog size={30} color="#fff" />
        <Link to="/" className="text-white text-decoration-none fs-3 fw-bold">
          Blogify
        </Link>
      </div>

      {/* Right: Home | Add Post | Avatar */}
      <div className="d-flex align-items-center gap-3">
        {/* Home */}
        <Link to="/" className="btn btn-sm btn-outline-light">
          <FaHome className="me-2" />
          Home
        </Link>

        {/* Add Post */}
        {user && (
          <Link to="/addpost" className="btn btn-sm btn-outline-light">
            <FaPlus className="me-2" />
            Add Post
          </Link>
        )}

        {/* Avatar or Sign in */}
        {!user ? (
          <Link to="/login">
            <button className="btn btn-outline-light px-4 py-2 rounded-pill">
              Sign in
            </button>
          </Link>
        ) : (
          <div className="dropdown">
            <div
              className="avatar-container rounded-circle overflow-hidden bg-info"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
            >
              <img
                src={user.profile}
                className="img-fluid h-100 w-100"
                alt="Profile"
                style={{ objectFit: "cover" }}
              />
            </div>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark mt-2">
              {user.role === "admin" && (
                <li>
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
