import express from "express";
import { CORS_ORIGIN, NODE_ENV, PORT } from "./config/env.config.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/db.js";
import cors from "cors";
import rateLimiter from "./middleware/rate-limiter/rateLimiter.js";
import morgan from "morgan";
import logger from "./lib/logger/logger.js";
import helmet from "helmet";

const app = express();

// MIDDLEWARES
// Morgan middleware
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

// HELMET
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
  }),
);

app.use(cookieParser());
app.use(express.json({ extended: false }));
app.use(rateLimiter());

// CORS
app.use(
  cors({
    origin: [CORS_ORIGIN],
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Decal nutrition API running successfully!",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Health ok", status: "OK", timestamp: new Date() });
});



// Run server
app.listen(PORT, async () => {
  console.log(`App running on http://localhost:${PORT} in ${NODE_ENV} mode`);
  await connectDB();
});


export default app;