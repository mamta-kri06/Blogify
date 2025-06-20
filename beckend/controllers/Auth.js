import { UserModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  try {
    const { FullName, email, password } = req.body;
    const exitUser = await UserModel.findOne({ email });
    if (exitUser) {
      return res
        .status(303)
        .json({ success: false, message: "User already exist.Please login." });
    }
    const imagePath = `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${encodeURIComponent(
      FullName
    )}`;

    const hashpassword = await bcryptjs.hashSync(password, 10);
    const NewUser = new UserModel({
      FullName,
      email,
      password: hashpassword,
      profile: imagePath,
    });
    await NewUser.save();
    return res.status(200).json({
      success: true,
      message: "User register successfully",
      user: NewUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fiels are required" });
    }
    const FindUser = await UserModel.findOne({ email });
    if (!FindUser) {
      return res
        .status(400)
        .json({ success: false, message: "No user found. Please register." });
    }
    const comparepassword = await bcryptjs.compare(password, FindUser.password);
    if (!comparepassword) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: FindUser._id },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: FindUser,
      token,
    });
  } catch (error) {
    console.log("error");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log("error");
    return res
      .status(500)
      .json({ success: false, message: "Ianternal server error" });
  }
};
export { Register, Login, Logout };
