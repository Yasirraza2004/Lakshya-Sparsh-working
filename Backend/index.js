import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import config from "./src/Config/config.js";
import connectDB from "./src/Config/database.js";
import passport from "./src/Config/passport.js";
import authRoutes from "./src/routes/authRoutes.js";
import investmentRoutes from "./src/routes/investmentRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

const app = express();

if (config.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// CORS
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  })
);

// Parse incoming request bodies
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    name: "connect.sid",
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: config.MONGODB_URI,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60,
    }),

    cookie: {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite:
        config.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  })
);

// Passport must run after session middleware
app.use(passport.initialize());
app.use(passport.session());

// Health check
app.get("/", (_req, res) => {
  res.json({
    message: "Lakshya Sparsh API is running",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/admin", adminRoutes);

// Not found
app.use((_req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Central error handler
app.use((err, _req, res, _next) => {
  console.error(err);

  if (res.headersSent) return;

  const status = err.statusCode || err.status || 500;

  res.status(status).json({
    message:
      config.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message || "Internal server error",
  });
});

// Connect database before starting server
connectDB()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(
        `Lakshya Sparsh API running at http://localhost:${config.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });