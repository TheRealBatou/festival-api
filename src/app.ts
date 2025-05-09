import dotenv from "dotenv";
dotenv.config();
import express from "express";
import festivalRoutes from "./routes/festival.routes";

const app = express();

// Middleware for JSON processing
app.use(express.json());
// routes
app.use("/api/v1/festivals", festivalRoutes);

export default app;
