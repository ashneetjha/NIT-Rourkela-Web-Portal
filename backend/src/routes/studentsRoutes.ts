import { Router } from "express";
import { createListController } from "../controllers/resourceController.js";
import { getStudents } from "../data/store.js";
import { requireAuth } from "../middleware/auth.js";

export const studentsRoutes = Router();

studentsRoutes.get("/", requireAuth, createListController(getStudents));
