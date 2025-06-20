import React from "react";
import Recentpost from "../components/Recentpost";

function Home() {
  return (
    <>
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          minHeight: "70vh",
          background: "linear-gradient(135deg, #1f1f21, #3c3c3e)",
          color: "#f8f9fa",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h1 className="display-3 fw-bold">
          Welcome to <span style={{ color: "#00d4ff" }}>Blogify</span>
        </h1>
        <p className="fs-5 text-light mb-4 ">
          Share your thoughts, inspire the world.
        </p>
      </div>

      {/* Recent Posts */}
      <div
        className="container py-5"
        style={{ backgroundColor: "#f4f4f5", borderRadius: "10px" }} // light contrast bg
      >
        <Recentpost />
      </div>
    </>
  );
}

export default Home;
