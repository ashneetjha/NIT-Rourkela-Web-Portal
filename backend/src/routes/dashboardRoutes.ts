import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getDashboardStats } from "../data/store.js";

export const dashboardRoutes = Router();

dashboardRoutes.get(
  "/",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const stats = await getDashboardStats();
    res.json(stats);
  }),
);
