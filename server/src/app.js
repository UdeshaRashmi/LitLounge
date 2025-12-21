import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/AddBookRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
// Enable CORS for local development (allow client dev server)
app.use(cors({ origin: true, credentials: true }));
// Increase body size limits to allow base64 images in JSON payloads (e.g., book cover previews)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Development-only debug route to inspect incoming headers
if (process.env.NODE_ENV !== "production") {
  app.get("/debug/headers", (req, res) => {
    res.json(req.headers);
  });
}

app.get("/api", (req, res) => {
  res.send("LitLounge API is running...");
});

// Serve client build in production so server and client use the same port
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "../..", "client", "dist");
  app.use(express.static(clientDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use(errorHandler);

export default app;
