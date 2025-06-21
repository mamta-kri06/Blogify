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

// CORS setup using .env FRONTEND_URL
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MongoDB connection
DBconnection();

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/auth", AuthRoutes);
app.use("/blog", BlogRoutes);
app.use("/dashboard", DashboardRoutes);
app.use("/comment", commentRoutes);
app.use("/public", PublicRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
