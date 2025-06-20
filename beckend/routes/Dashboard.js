import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import { Getalldata, GetUser, deleteUser } from "../controllers/Dashboard.js";

const DashboardRoutes = express.Router();

DashboardRoutes.get("/", isAdmin, Getalldata);
DashboardRoutes.get("/users", isAdmin, GetUser);
DashboardRoutes.delete("/delete/:id", isAdmin, deleteUser);
export { DashboardRoutes };
