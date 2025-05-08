import { AppDataSource } from "../data-source";
import { Festival } from "../entities/festival.entity";
import {
  NoFestivalFoundError,
  QueryBuilderError,
} from "../errors/custom-errors";

export class FestivalService {
  private readonly festivalRepo = AppDataSource.getRepository(Festival);

  public async loadFestivals(
    page: number,
    limit: number,
    filters: { name?: string; location?: string; from?: string; to?: string }
  ) {
    const offset = (page - 1) * limit;

    const query = await this.createFilterQuery(filters);

    if (!query) {
      throw new QueryBuilderError();
    }

    query.skip(offset).take(limit);

    const [festivals, total] = await query.getManyAndCount();

    if (!festivals) {
      throw new NoFestivalFoundError();
    }

    const totalPages = Math.ceil(total / limit);

    return {
      data: festivals,
      page,
      totalPages,
      total,
      limit,
    };
  }

  private async createFilterQuery(filters: {
    name?: string;
    location?: string;
    from?: string;
    to?: string;
  }) {
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
