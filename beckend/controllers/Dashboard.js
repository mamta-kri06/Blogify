import { PostModel } from "../models/blog.js";
import CommentModel from "../models/comments.js";
import { UserModel } from "../models/user.js";
import fs from "fs";
import path from "path";

const Getalldata = async (req, res) => {
  try {
    const users = await UserModel.find();
    const posts = await PostModel.find();
    const comments = await CommentModel.find();

    if (!users || !posts || !comments) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res.status(200).json({ success: true, users, posts, comments });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const GetUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
      d;
    }
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const exituser = await UserModel.findById(userId);
    if (!exituser) {
      return res.status(404).json({ success: false, message: "No user found" });
    }
    if (exituser.role == "admin") {
      return res
        .status(404)
        .json({ success: false, message: "Sorry, Admin can't be deleted" });
    }
    if (exituser.profile) {
      const profilepath = path.join("public/images", exituser.profile);
      fs.promises
        .unlink(profilepath)
        .then(() => console.log("user image deleted"))
        .catch((error) => console.log("Error deleting user image", error));
    }
    const deletethatuser = await UserModel.findByIdAndDelete(userId);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: deletethatuser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export { Getalldata, GetUser, deleteUser };
