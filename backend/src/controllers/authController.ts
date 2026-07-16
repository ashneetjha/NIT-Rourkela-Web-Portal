import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/apiError.js";
import { signToken } from "../utils/jwt.js";
import { authenticateLocalUser } from "../data/store.js";

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation failed.", errors.array());
  }

  const { email, password } = req.body as { email: string; password: string };
  const user = await authenticateLocalUser(email.toLowerCase(), password);

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = signToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
  });

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      department: user.department,
    },
  });
};
