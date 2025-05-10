import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { AppDataSource } from "./data-source";
import logger from "./logger/logger";
import { getErrorMessage } from "./utils/error.utils";

const baseUrl = process.env.BASE_URL;
const port = Number(process.env.BASE_PORT);

// Connect to database
AppDataSource.initialize()
  .then(() => {
    logger.info("Database-connection successful!");

    app.get("/", (req, res) => {
      res.send("If you can read this the server is probably running");
    });

    // Start server
    app.listen(port, () => {
      logger.info(`Server's running at ${baseUrl}${port}`);
    });
  })
  .catch((error: unknown) => {
    logger.error("Error during database connection: " + getErrorMessage(error));
  });
