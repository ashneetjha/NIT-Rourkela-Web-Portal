import { Router } from "express";
import { authRoutes } from "./authRoutes.js";
import { dashboardRoutes } from "./dashboardRoutes.js";
import { healthRoutes } from "./healthRoutes.js";
import { marksRoutes } from "./marksRoutes.js";
import { panelsRoutes } from "./panelsRoutes.js";
import { reportsRoutes } from "./reportsRoutes.js";
import { studentsRoutes } from "./studentsRoutes.js";
import { subjectsRoutes } from "./subjectsRoutes.js";
import { usersRoutes } from "./usersRoutes.js";

export const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/users", usersRoutes);
apiRoutes.use("/students", studentsRoutes);
apiRoutes.use("/subjects", subjectsRoutes);
apiRoutes.use("/panels", panelsRoutes);
apiRoutes.use("/marks", marksRoutes);
apiRoutes.use("/dashboard", dashboardRoutes);
apiRoutes.use("/reports", reportsRoutes);
apiRoutes.use("/health", healthRoutes);
