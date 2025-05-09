import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { AppDataSource } from "./data-source";

const baseUrl = process.env.BASE_URL;
const port = Number(process.env.BASE_PORT);

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
