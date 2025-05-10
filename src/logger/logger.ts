//Used lib for logging -> Winston
import { createLogger, format, transports } from "winston";
import fs from "fs";
import path from "path";

// makes sure, that the log folder is created if it doesn't exist yet
const logDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Creates a logger that writes into a log file "logs/app.log
// Format: leading timestamp followed by the log-level and then the log-message
// log-level debug includes the log-levels: error, warn, info, http and debug
const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  // logs are written in the console and into a log-file
  transports: [new transports.Console(), new transports.File({ filename: "logs/app.log" })],
});

export default logger;
