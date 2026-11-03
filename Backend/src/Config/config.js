import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  NODE_ENV: process.env.NODE_ENV || "development",
};

if (!config.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from .env");
}

if (!config.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is missing from .env");
}

export default config;
