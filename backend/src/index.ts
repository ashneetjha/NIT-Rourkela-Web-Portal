import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { initializeSeedData, syncToMongo } from "./data/store.js";

const bootstrap = async () => {
  await initializeSeedData();
  await connectDatabase();
  await syncToMongo();

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`[msms] API listening on http://localhost:${env.port}`);
  });
};

void bootstrap();
