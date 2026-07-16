import mongoose from "mongoose";
import { env } from "./env.js";

let connected = false;

export const connectDatabase = async () => {
  if (!env.mongodbUri) {
    console.warn("[msms] MONGODB_URI is missing. Running with in-memory demo data.");
    return false;
  }

  try {
    await mongoose.connect(env.mongodbUri, { dbName: env.mongodbDb });
    connected = true;
    console.log(`[msms] MongoDB connected to ${env.mongodbDb}`);
    return true;
  } catch (error) {
    connected = false;
    console.warn("[msms] MongoDB connection failed. Falling back to demo data.", error);
    return false;
  }
};

export const isDatabaseConnected = () => connected && mongoose.connection.readyState === 1;
