import { connectDatabase } from "./config/database.js";
import { initializeSeedData, syncToMongo } from "./data/store.js";

const run = async () => {
  await initializeSeedData();
  const connected = await connectDatabase();
  if (connected) {
    await syncToMongo();
  }

  console.log("[msms] Seed data prepared.");
  console.log("[msms] Demo credentials:");
  console.log("  admin@nitr.edu / Password123!");
  console.log("  coordinator@nitr.edu / Password123!");
  console.log("  faculty@nitr.edu / Password123!");
};

void run();
