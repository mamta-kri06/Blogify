import { PostModel } from "../models/blog.js";
import CommentModel from "../models/comments.js";

const addComment = async (req, res) => {
  try {
    const { postId, userId, comment } = req.body;
    const newComment = new CommentModel({
      postId,
      userId,
      comment,
    });
    await newComment.save();
    const post = await PostModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }
    post.comments.push(newComment._id);
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export default addComment;
