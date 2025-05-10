import { AppDataSource } from "../data-source";
import { Festival } from "../entities/festival.entity";
import { NoFestivalFoundError, QueryBuilderError } from "../errors/custom-errors";
import { FestivalListResult } from "../interfaces/festival.interface";
import logger from "../logger/logger";

export class FestivalService {
  private readonly festivalRepo = AppDataSource.getRepository(Festival);

  public async loadFestivals(
    page: number,
    limit: number,
    filters: { name?: string; location?: string; from?: string; to?: string }
  ): Promise<FestivalListResult> {
    // offset defines how many items are skipped for the list
    const offset = (page - 1) * limit;

    logger.debug(`Number of items skipped in selection (offset): ${offset}`);

    // building a query which considers the filtering options
    const query = await this.createFilterQuery(filters);

    if (!query) {
      throw new QueryBuilderError();
    }

    // sets the offset (number of items skipped) and limit (number of items shown)
    query.skip(offset).take(limit);

    // selects the festivals and counts the total amount to be shown in the additional result info
    const [festivals, total] = await query.getManyAndCount();

    if (!festivals) {
      throw new NoFestivalFoundError();
    }

    const totalPages = Math.ceil(total / limit);

    logger.debug(`Number of total pages: ${totalPages}`);

    return {
      data: festivals,
      page,
      totalPages,
      total,
      limit,
    };
  }

  public async loadFestival(festivalId: number): Promise<Festival> {
    const festival = await this.festivalRepo.findOneBy({ festivalId });

    if (!festival) {
      throw new NoFestivalFoundError();
    }

    return festival;
  }

  public async createFestival(
    name: string,
    date: string,
    location: string,
    description: string,
    imageUrl: string
  ): Promise<Festival> {
    const festival = this.festivalRepo.create({
      name,
      date,
      location,
      description,
      imageUrl,
    });

    await this.festivalRepo.save(festival);

    return festival;
  }

  public async deleteFestival(festivalId: number): Promise<void> {
    const festival = await this.festivalRepo.findOneBy({ festivalId });

    if (!festival) {
      throw new NoFestivalFoundError();
    }

    logger.info(`Festival to be deleted: ${JSON.stringify(festival)}`);

    await this.festivalRepo.delete(festival);
  }

  public async updateFestival(
    festivalId: number,
    updateData: Partial<Festival>
  ): Promise<Festival> {
    const festival = await this.festivalRepo.findOneBy({ festivalId });

    if (!festival) {
      throw new NoFestivalFoundError();
    }

    logger.info(`Current festival values: ${JSON.stringify(festival)}`);

    // Assigns the values of the Partial<Festival> (which contains the updated values for the festival) to the festival
    Object.assign(festival, updateData);
    await this.festivalRepo.save(festival);

    return festival;
  }

  private async createFilterQuery(filters: {
    name?: string;
    location?: string;
    from?: string;
    to?: string;
  }) {
    // building a query which considers the filtering options
    const query = this.festivalRepo.createQueryBuilder("festival");

    if (filters.name) {
      query.andWhere("festival.name ILIKE :name", {
        name: `%${filters.name}%`,
      });
    }

    if (filters.location) {
      query.andWhere("festival.location = :location", {
        location: filters.location,
      });
    }

    if (filters.from) {
      query.andWhere("festival.date >= :from", { from: filters.from });
    }

    if (filters.to) {
      query.andWhere("festival.date <= :to", { to: filters.to });
    }

    return query;
  }
}
