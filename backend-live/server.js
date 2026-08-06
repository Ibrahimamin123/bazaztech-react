import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import cmsRoutes from "./routes/cmsRoutes.js";

dotenv.config();

const app = express();

// Required when the API sits behind a reverse proxy / load balancer (Render,
// Railway, Nginx, etc). Without this, req.protocol always reports "http",
// which produces broken/mixed-content image URLs once the site is served
// over https in production.
app.set("trust proxy", 1);

// CLIENT_URL can be a single origin or a comma-separated list (e.g.
// "https://bazaztech.com,http://localhost:5173") so the production site
// and local development can both call the API without loosening CORS
// to allow any origin.
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// Also serve uploads under /api/uploads so image URLs work behind reverse
// proxies that only forward the /api path to this backend (see
// controllers/uploadController.js for why new uploads use this path).
app.use("/api/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/cms", cmsRoutes);

app.use((err, _req, res, next) => {
  if (!err) return next();

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Image must be smaller than 1MB.",
    });
  }

  if (err.message === "Only image files are allowed.") {
    return res.status(400).json({
      success: false,
      message: "Only image files are allowed.",
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Server error.",
  });
});

app.get("/", (_req, res) => {
  res.send("BazazTech Backend is Running...");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
