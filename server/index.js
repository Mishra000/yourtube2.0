import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";
import historyRoutes from "./routes/history.js";
import likeRoutes from "./routes/like.js";
import watchlaterRoutes from "./routes/watchlater.js";

import { syncUploadsFolder } from "./controllers/video.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/auth", authRoutes);
app.use("/video", videoRoutes);
app.use("/comment", commentRoutes);
app.use("/history", historyRoutes);
app.use("/like", likeRoutes);
app.use("/watchlater", watchlaterRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("YouTube Backend API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      console.log("MongoDB connected successfully");
      await syncUploadsFolder();
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error);
    });
}