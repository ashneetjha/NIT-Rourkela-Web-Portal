import { Router } from "express";
import { createListController } from "../controllers/resourceController.js";
import { getPanels } from "../data/store.js";
import { requireAuth } from "../middleware/auth.js";

export const panelsRoutes = Router();

panelsRoutes.get("/", requireAuth, createListController(getPanels));
