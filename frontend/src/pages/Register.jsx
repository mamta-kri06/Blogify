import React, { useState } from "react";
import { post } from "../services/Endpoint.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    FullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await post("/auth/register", value);
      if (response?.status === 200) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">Create Account</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="FullName" className="form-label fw-semibold">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="FullName"
              placeholder="Your name"
              value={value.FullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="example@domain.com"
              value={value.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Create a password"
              value={value.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success btn-lg fw-semibold"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-center mt-4 mb-0">
          Already have an account?{" "}
          <a href="/login" className="text-decoration-none">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
