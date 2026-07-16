import { Router } from "express";
import { createListController } from "../controllers/resourceController.js";
import { getMarks } from "../data/store.js";
import { requireAuth } from "../middleware/auth.js";

export const marksRoutes = Router();

marksRoutes.get("/", requireAuth, createListController(getMarks));
