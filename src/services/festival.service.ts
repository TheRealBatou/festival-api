import { AppDataSource } from "../data-source";
import { Festival } from "../entities/festival.entity";
import { NoFestivalFoundError } from "../errors/custom-errors";

export class FestivalService {
  private readonly festivalRepo = AppDataSource.getRepository(Festival);

  public async loadFestivals(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const [festivals, total] = await this.festivalRepo.findAndCount({
      skip: offset,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    if (!festivals) {
      throw new NoFestivalFoundError();
    }

    return {
      data: festivals,
      page,
      totalPages,
      total,
      limit,
    };
  }
}
