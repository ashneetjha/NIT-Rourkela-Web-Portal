import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import { verifyToken } from "../utils/jwt.js";
import type { Role } from "../types/auth.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: Role;
    email: string;
    name: string;
  };
}

export const requireAuth = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Authorization token is required.");
  }

  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    req.user = {
      id: String(payload.sub),
      role: payload.role as Role,
      email: String(payload.email),
      name: String(payload.name),
    };
    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token.");
  }
};

export const requireRoles = (...allowedRoles: Role[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required.");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have access to this resource.");
    }

    next();
  };
};
