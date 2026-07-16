import { Router } from "express";
import { createListController } from "../controllers/resourceController.js";
import { getSubjects } from "../data/store.js";
import { requireAuth } from "../middleware/auth.js";

export const subjectsRoutes = Router();

subjectsRoutes.get("/", requireAuth, createListController(getSubjects));
