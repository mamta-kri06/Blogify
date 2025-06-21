import express from "express";
import dotenv from "dotenv";
import { DBconnection } from "./utils/db.js";
import { AuthRoutes } from "./routes/Auth.js";
import cookieParser from "cookie-parser";
import { BlogRoutes } from "./routes/Blog.js";
import { DashboardRoutes } from "./routes/Dashboard.js";
import commentRoutes from "./routes/comments.js";
import PublicRoutes from "./routes/Public.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};

//mongodb connection
DBconnection();
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.redirect("https://inspiring-cat-17194d.netlify.app/auth/login");
});
app.use("/auth", AuthRoutes);
app.use("/blog", BlogRoutes);
app.use("/dashboard", DashboardRoutes);
app.use("/comment", commentRoutes);
app.use("/public", PublicRoutes);

app.listen(PORT, () => {
  console.log(`app is rn on ${PORT}`);
});
