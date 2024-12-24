import { config as conf } from "dotenv";

conf();

const requiredVars = ["SERVER_PORT", "MONGODB_URL"];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Environment variable ${key} is not defined.`);
    process.exit(1);
  }
});

const config = {
  port: process.env.SERVER_PORT || 3000,
  databaseUrl: process.env.MONGODB_URL || "mongodb://localhost:27017/defaultdb",
};

export default config;
