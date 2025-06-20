import express from "express";
import addComment from "../controllers/comment.js";
import { isLogin } from "../middleware/isLogin.js";

const commentRoutes = express.Router();

commentRoutes.post("/addcomment", isLogin, addComment);

export default commentRoutes;
