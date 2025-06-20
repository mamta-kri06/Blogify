import React from "react";
import { FaUser, FaLock, FaCamera } from "react-icons/fa";

function Profile() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 ">
      <div
        className="card p-4 shadow bg-secondary"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center text-white mb-4">Update Profile</h3>
        <form>
          {/* Profile Image Upload */}
          <div className="d-flex justify-content-center mb-4 position-relative">
            <label htmlFor="profileImage" className="position-relative">
              <div
                className="rounded-circle bg-light d-flex justify-content-center align-items-center"
                a
                style={{ width: "100px", height: "100px" }}
              >
                <FaUser size={40} className="text-muted" />
              </div>
              <FaCamera
                className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 border"
                style={{ fontSize: "18px" }}
              />
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="d-none"
            />
          </div>

          {/* Input Fields */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-white">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Update Name"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text bg-white">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Old Password"
            />
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text bg-white">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
