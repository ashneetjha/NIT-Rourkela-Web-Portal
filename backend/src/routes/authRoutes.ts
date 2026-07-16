import { Router } from "express";
import { login } from "../controllers/authController.js";
import { loginValidators } from "../validators/authValidators.js";

export const authRoutes = Router();

authRoutes.post("/login", loginValidators, login);
