import { Router } from "express";
import { exportMarksReport, importMarksReport, uploadSingleReport } from "../controllers/reportController.js";
import { requireAuth } from "../middleware/auth.js";

export const reportsRoutes = Router();

reportsRoutes.get("/export", requireAuth, exportMarksReport);
reportsRoutes.post("/import", requireAuth, uploadSingleReport, importMarksReport);
