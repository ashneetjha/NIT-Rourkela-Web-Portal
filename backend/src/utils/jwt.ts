import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthUser } from "../types/auth.js";

export const signToken = (user: AuthUser) =>
  jwt.sign(
    {
      sub: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
    } satisfies SignOptions,
  );

export const verifyToken = (token: string) => jwt.verify(token, env.jwtSecret) as jwt.JwtPayload;
