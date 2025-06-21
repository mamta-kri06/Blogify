import { PostModel } from "../models/blog.js";
import fs from "fs";
import path from "path";

const Create = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const imagePath = req.file.path;
    const Blog = new PostModel({
      title,
      desc,
      image: imagePath, //  Save full URL
    });

    await Blog.save();
    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      post: Blog,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    if (post.image) {
      const profilepath = path.join("public/images", post.image);
      fs.promises
        .unlink(profilepath)
        .then(() => console.log("Post image deleted"))
        .catch((error) => console.log("Error deleting post image", error));
    }
    const deletePost = await PostModel.findByIdAndDelete(postId);
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      post: deletePost,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getposts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    if (!posts) {
      return res.status(404).json({ success: false, message: "No post found" });
    }
    return res.status(200).json({ success: true, posts });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const postId = req.params.id;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    if (title) {
      post.title = title;
    }
    if (desc) {
      post.desc = desc;
    }
    if (req.file) {
      post.image = req.file.filename;
    }
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: post,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { Create, deleteBlog, getposts, update };
