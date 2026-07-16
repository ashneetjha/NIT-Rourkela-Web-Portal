import { Router } from "express";
import type { Request, Response } from "express";
import { requireAuth } from "../middleware/auth.js";

export const healthRoutes = Router();

healthRoutes.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "MSMS API",
    timestamp: new Date().toISOString(),
  });
});

healthRoutes.get("/secure", requireAuth, (_req: Request, res: Response) => {
  res.json({ status: "ok", secure: true });
});
