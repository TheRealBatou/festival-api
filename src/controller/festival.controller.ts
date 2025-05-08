import { Request, Response } from "express";
import { FestivalService } from "../services/festival.service";
import { CustomError, InvalidFestivalId, InvalidUpdateInput } from "../errors/custom-errors";
import { Festival } from "../entities/festival.entity";
import { FestivalUpdateDTO } from "../interfaces/festivalUpdateDTO.interface";

export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {
    this.loadFestivals = this.loadFestivals.bind(this);
    this.loadFestival = this.loadFestival.bind(this);
    this.createFestival = this.createFestival.bind(this);
    this.deleteFestival = this.deleteFestival.bind(this);
  }

  public async loadFestivals(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      const filters = {
        name: req.query.name as string | undefined,
        location: req.query.location as string | undefined,
        from: req.query.from as string | undefined,
        to: req.query.to as string | undefined,
      };

      const festivals = await this.festivalService.loadFestivals(page, limit, filters);

      res.status(200).json(festivals);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error("Error during loading festivals ", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  public async loadFestival(req: Request, res: Response): Promise<void> {
    try {
      // the 10 defines the decimal radix
      const festivalId = parseInt(req.params.festivalId, 10);

      if (isNaN(festivalId)) {
        throw new InvalidFestivalId();
      }

      const festival = await this.festivalService.loadFestival(festivalId);

      res.status(200).json(festival);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error("Error during loading a festival ", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  public async createFestival(req: Request, res: Response): Promise<void> {
    try {
      const { name, date, location, description, imageUrl } = req.body;

      // Validate that the required fields are filled and strings
      if (typeof name !== "string" || typeof date !== "string" || typeof location !== "string") {
        res
          .status(400)
          .json({ message: "The fields name, date and location are required and must be strings" });
        return;
      }

      // Validate if the field date fits the ISO-8601
      if (isNaN(Date.parse(date))) {
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

      res.status(200).json(festival);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error("Error during festival creation ", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  public async deleteFestival(req: Request, res: Response): Promise<void> {
    try {
      // the 10 defines the decimal radix
      const festivalId = parseInt(req.params.festivalId, 10);

      if (isNaN(festivalId)) {
        throw new InvalidFestivalId();
      }

      await this.festivalService.deleteFestival(festivalId);

      res.status(200).json(`Festival with ID ${festivalId} deleted`);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error("Error during deletion of a festival ", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  public async updateFestival(req: Request, res: Response): Promise<void> {
    try {
      // the 10 defines the decimal radix
      const festivalId = parseInt(req.params.festivalId, 10);

      if (isNaN(festivalId)) {
        throw new InvalidFestivalId();
      }

      // DTO with all fields optional
      const updateInput = req.body as FestivalUpdateDTO;

      // validates all inputs and creates a Partial(mandatory fields throw errors if empty)
      const validatedData = validateFestivalUpdateInput(updateInput);

      const festival = await this.festivalService.updateFestival(festivalId, validatedData);

      res.status(200).json(festival);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error("Error while updating a festival", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

// function validates the input data you receive and creates an Partial<Festival> object
// every field is tested for typeof "string" and if the string only consists of whitespace characters
// mandatory fields throw errors if they're empty
function validateFestivalUpdateInput(input: FestivalUpdateDTO): Partial<Festival> {
  const validatedData: Partial<Festival> = {};

  if (typeof input.name === "string" && input.name.trim() !== "") {
    validatedData.name = input.name.trim();
  } else if (input.name !== undefined) {
    throw new InvalidUpdateInput("Invalid name provided");
  }

  if (typeof input.date === "string" && input.date.trim() !== "") {
    // date-string is parsed to Date to validate correct ISO-8601 format
    const parsedDate = Date.parse(input.date.trim());
    if (isNaN(parsedDate)) {
      throw new InvalidUpdateInput("Invalid ISO-8601 format for date field");
    }

    validatedData.date = input.date.trim();
  } else if (input.date !== undefined) {
    throw new InvalidUpdateInput("Invalid date provided (ISO-8601 format needed)");
  }

  if (typeof input.location === "string" && input.location.trim() !== "") {
    validatedData.location = input.location.trim();
  } else if (input.location !== undefined) {
    throw new InvalidUpdateInput("Invalid location provided");
  }

  if (typeof input.description === "string") {
    validatedData.description = input.description.trim();
  }

  if (typeof input.imageUrl === "string") {
    validatedData.imageUrl = input.imageUrl.trim();
  }

  // If not a single input field is correct
  if (Object.keys(validatedData).length === 0) {
    throw new InvalidUpdateInput("No valid fields for update provided");
  }

  return validatedData;
}
