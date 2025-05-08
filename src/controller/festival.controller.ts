import { Request, Response } from "express";
import { FestivalService } from "../services/festival.service";
import { CustomError } from "../errors/custom-errors";

export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {
    this.loadFestivals = this.loadFestivals.bind(this);
  }

  // Implement filtering options
  public async loadFestivals(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      const filters = {
        name: req.query.name as string | undefined,
        location: req.query.location as string | undefined,
      };

      const festivals = await this.festivalService.loadFestivals(
        page,
        limit,
        filters
      );

      res.status(200).json(festivals);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error("Error during registration ", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
