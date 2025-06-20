import React, { useState } from "react";
import { post } from "../services/Endpoint.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/AuthSlice.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setvalue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setvalue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await post("/auth/login", value);
      const data = response.data;
      if (response.status === 200) {
        navigate("/");
        toast.success(data.message);
        dispatch(setUser(data.user));
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">Welcome Back</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={value.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={value.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Sign In Button */}
          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn btn-success btn-lg fw-semibold"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Sign up link */}
        <p className="text-center mt-4 mb-0 ">
          Don’t have an account?{" "}
          <a href="/register" className="text-decoration-none ">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
