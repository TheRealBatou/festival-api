import { Request, Response } from "express";
import { FestivalService } from "../services/festival.service";
import { CustomError, InvalidFestivalIdError } from "../errors/custom-errors";
import { FestivalUpdateDTO } from "../interfaces/festivalUpdateDTO.interface";
import { validateFestivalUpdateInput } from "../utils/validation.utils";
import logger from "../logger/logger";
import { getErrorMessage } from "../utils/error.utils";

export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {
    this.loadFestivals = this.loadFestivals.bind(this);
    this.loadFestival = this.loadFestival.bind(this);
    this.createFestival = this.createFestival.bind(this);
    this.deleteFestival = this.deleteFestival.bind(this);
    this.updateFestival = this.updateFestival.bind(this);
  }

  public async loadFestivals(req: Request, res: Response): Promise<void> {
    logger.debug("Entering method: loadFestivals()");

    try {
      // received page and numer of items per page (with default values)
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      logger.info(`Selected Page: ${page} / Number of shown festivals: ${limit}`);

      // filtering options for the list with festivals
      const filters = {
        name: req.query.name as string | undefined,
        location: req.query.location as string | undefined,
        from: req.query.from as string | undefined,
        to: req.query.to as string | undefined,
      };

      logger.info(`Filtering options-> ${JSON.stringify(filters)}`);

      const festivals = await this.festivalService.loadFestivals(page, limit, filters);

      logger.info(`Loaded festivals: ${JSON.stringify(festivals)}`);

      res.status(200).json(festivals);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        logger.error("Error during loading festivals: " + error.message);
        res.status(error.statusCode).json({ message: error.message });
      } else {
        logger.error("Error during loading festivals: " + getErrorMessage(error));
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  public async loadFestival(req: Request, res: Response): Promise<void> {
    logger.debug("Entering method: loadFestival()");
    try {
      // the 10 defines the decimal radix (so numbers arent misinterpreted)
      const festivalId = parseInt(req.params.festivalId, 10);

      if (isNaN(festivalId)) {
        throw new InvalidFestivalIdError();
      }
      logger.info(`Try to load the festival with the ID: ${festivalId}`);

      const festival = await this.festivalService.loadFestival(festivalId);

      logger.info(`Loaded festival: ${JSON.stringify(festival)}`);

      res.status(200).json(festival);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        logger.error("Error during loading a festival: " + error.message);
        res.status(error.statusCode).json({ message: error.message });
      } else {
        logger.error("Error during loading a festival: " + getErrorMessage(error));
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  public async createFestival(req: Request, res: Response): Promise<void> {
    logger.debug("Entering method: createFestival()");
    try {
      logger.info(`Received information to create a festival: ${JSON.stringify(req.body)}`);

      const { name, date, location, description, imageUrl } = req.body;

      // Validate that the required fields are filled and strings
      if (typeof name !== "string" || typeof date !== "string" || typeof location !== "string") {
        logger.warn(
          `One of the mandatory fields was not filled or not a string: name: ${name} / date: ${date} / location: ${location}`
        );

        res
          .status(400)
          .json({ message: "The fields name, date and location are required and must be strings" });
        return;
      }

      // Validate if the field date fits the ISO-8601
      if (isNaN(Date.parse(date))) {
        logger.warn(`Date string doesn't fit the ISO-8601 format: ${date}`);
        res.status(400).json({ message: "Date must be a valid ISO-8601 string" });
        return;
      }

      // If the optional fields aren't strings or not filled an empty string is used instead
      const descriptionString = typeof description === "string" ? description : "";
      const imageUrlString = typeof imageUrl === "string" ? imageUrl : "";

      const festival = await this.festivalService.createFestival(
        name,
        date,
        location,
        descriptionString,
        imageUrlString
      );

      logger.info(`Created festival: ${JSON.stringify(festival)}`);

      res.status(201).json(festival);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        logger.error("Error during festival creation: " + error.message);
        res.status(error.statusCode).json({ message: error.message });
      } else {
        logger.error("Error during festival creation: " + getErrorMessage(error));
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  public async deleteFestival(req: Request, res: Response): Promise<void> {
    logger.debug("Entering method: deleteFestival()");
    try {
      // the 10 defines the decimal radix (so numbers arent misinterpreted)
      const festivalId = parseInt(req.params.festivalId, 10);

      logger.info(`Try to delete the festival with the ID: ${festivalId}`);

      if (isNaN(festivalId)) {
        throw new InvalidFestivalIdError();
      }

      await this.festivalService.deleteFestival(festivalId);

      logger.info(`Festival deleted successfully`);

      res.status(200).json(`Festival with ID ${festivalId} deleted`);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        logger.error("Error during deletion of a festival: " + error.message);
        res.status(error.statusCode).json({ message: error.message });
      } else {
        logger.error("Error during deletion of a festival: " + getErrorMessage(error));
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  public async updateFestival(req: Request, res: Response): Promise<void> {
    logger.debug("Entering method: updateFestival()");
    try {
      // the 10 defines the decimal radix (so numbers arent misinterpreted)
      const festivalId = parseInt(req.params.festivalId, 10);

      logger.info(`Try to update the festival with the ID: ${festivalId}`);

      if (isNaN(festivalId)) {
        throw new InvalidFestivalIdError();
      }

      // DTO with all fields of a festival as optional
      const updateInput = req.body as FestivalUpdateDTO;

      logger.info(`Updated values for the festival: ${JSON.stringify(updateInput)}`);

      // validates all inputs and creates a Partial<Festival> (mandatory festival fields throw errors if empty)
      const validatedData = validateFestivalUpdateInput(updateInput);

      const festival = await this.festivalService.updateFestival(festivalId, validatedData);

      logger.info(`Festival with updated values: ${JSON.stringify(festival)}`);

      res.status(200).json(festival);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        logger.error("Error while updating a festival: " + error.message);
        res.status(error.statusCode).json({ message: error.message });
      } else {
        logger.error("Error while updating a festival: " + getErrorMessage(error));
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
