import { Router } from "express";
import { createListController } from "../controllers/resourceController.js";
import { getUsers } from "../data/store.js";
import { requireAuth, requireRoles } from "../middleware/auth.js";

export const usersRoutes = Router();

usersRoutes.get("/", requireAuth, requireRoles("admin", "coordinator"), createListController(getUsers));
