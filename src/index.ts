import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { AppDataSource } from "./data-source";
import logger from "./logger/logger";
import { getErrorMessage } from "./utils/error.utils";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const baseUrl = process.env.BASE_URL;
const port = Number(process.env.BASE_PORT);

// Swagger-Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Festival API",
      version: "1.0.0",
      description: "API for festival CRUD functions",
    },
  },
  apis: ["./src/routes/*.ts", "./src/entities/*.ts", "./src/interfaces/*.ts"], // paths for swagger docs
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Set Swagger UI-Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to database
AppDataSource.initialize()
  .then(() => {
    logger.info("Database-connection successful!");

    app.get("/", (req, res) => {
      res.send("If you can read this the server is probably running");
    });

    // Start server
    app.listen(port, () => {
      logger.info(`Server's running at ${baseUrl}:${port}`);
    });
  })
  .catch((error: unknown) => {
    logger.error("Error during database connection: " + getErrorMessage(error));
  });
