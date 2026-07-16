import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, "Route not found."));
};

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message, details: error.details });
  }

  console.error("[msms] Unhandled error:", error);
  return res.status(500).json({ message: "Internal server error." });
};
