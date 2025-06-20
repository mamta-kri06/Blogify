import { PostModel } from "../models/blog.js";

const GetSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId).populate({
      path: "comments",
      populate: {
        path: "userId",
      },
    });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }
    return res.status(200).json({
      success: true,
      Post: post,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { GetSinglePost };
