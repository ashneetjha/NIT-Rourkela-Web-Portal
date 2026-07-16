import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { apiRoutes } from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_req, res) => {
    res.json({ message: "MSMS API is running." });
  });

  app.use("/api", apiRoutes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
