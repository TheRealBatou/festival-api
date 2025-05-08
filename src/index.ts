import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { AppDataSource } from "./data-source";
import festivalRoutes from "./routes/festival.routes";

const app = express();
const baseUrl = process.env.BASE_URL;
const port = Number(process.env.BASE_PORT);

// Middleware for JSON processing
app.use(express.json());

// routes
app.use("/api/v1/festivals", festivalRoutes);

// Connect to database
AppDataSource.initialize()
  .then(() => {
    console.log("Database-connection successful!");

    app.get("/", (req, res) => {
      res.send("If you can read this the server is probably running");
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server's running at ${baseUrl}${port}`);
    });
  })
  .catch((error) => {
    console.error("Error during database connection", error);
  });
