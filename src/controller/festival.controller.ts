import { Request, Response } from "express";
import { FestivalService } from "../services/festival.service";
import { CustomError, InvalidFestivalId } from "../errors/custom-errors";

export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {
    this.loadFestivals = this.loadFestivals.bind(this);
    this.loadFestival = this.loadFestival.bind(this);
  }

  public async loadFestivals(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      const filters = {
        name: req.query.name as string | undefined,
        location: req.query.location as string | undefined,
        from: req.query.from as string | undefined,
        to: req.query.to as string | undefined,
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

  public async loadFestival(req: Request, res: Response) {
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
        console.error("Error during registration ", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
