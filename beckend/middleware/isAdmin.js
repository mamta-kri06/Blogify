import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(403)
        .json({ message: "Unauthorised: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorised: User not found" });
    }
    if (user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorised: User is not an admin",
      });
    }
    next();
  } catch (error) {
    a;
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { isAdmin };
