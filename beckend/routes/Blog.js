import express from "express";
import { Create, deleteBlog, getposts, update } from "../controllers/Blog.js";
import { isAdmin } from "../middleware/isAdmin.js";
import upload from "../middleware/Multer.js";
import { isLogin } from "../middleware/isLogin.js";

const BlogRoutes = express.Router();
BlogRoutes.post("/create", isLogin, upload.single("image"), Create);
BlogRoutes.delete("/delete/:id", isAdmin, deleteBlog);
BlogRoutes.get("/getposts", getposts);
BlogRoutes.patch("/update/:id", isAdmin, upload.single("image"), update);

export { BlogRoutes };
