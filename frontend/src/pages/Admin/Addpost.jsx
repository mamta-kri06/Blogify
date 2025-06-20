import React, { useState } from "react";
import { post } from "../../services/Endpoint.js";
import toast from "react-hot-toast";

function Addpost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("image", image);

    try {
      const response = await post("/blog/create", formData, true);
      if (response?.status === 200 || response?.data?.success) {
        toast.success("Post created successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
        document.getElementById("image").value = "";
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div
            className="card border-0 shadow"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            {/* Header */}
            <div
              className="card-header text-white text-center"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                padding: "30px",
              }}
            >
              <h2 className="mb-0 fw-bold">📝 Create a New Post</h2>
            </div>

            {/* Body */}
            <div className="card-body p-5">
              <form
                method="post"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                {/* Image Upload */}
                <div className="mb-4">
                  <label htmlFor="image" className="form-label fw-semibold">
                    📷 Upload Image
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                {/* Title */}
                <div className="mb-4">
                  <label htmlFor="postTitle" className="form-label fw-semibold">
                    🏷️ Post Title
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="postTitle"
                    name="postTitle"
                    placeholder="Enter Your Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label
                    htmlFor="postDescription"
                    className="form-label fw-semibold"
                  >
                    📝 Description
                  </label>
                  <textarea
                    className="form-control"
                    id="postDescription"
                    name="postDescription"
                    rows="6"
                    placeholder="Write your story here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ resize: "none" }}
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="d-grid mt-4">
                  <button
                    type="submit"
                    className="btn btn-lg text-white fw-semibold"
                    style={{
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      border: "none",
                      padding: "12px 0",
                      borderRadius: "10px",
                      transition: "0.3s",
                    }}
                  >
                    🚀 Submit Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addpost;
