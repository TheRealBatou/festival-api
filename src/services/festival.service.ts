import { AppDataSource } from "../data-source";
import { Festival } from "../entities/festival.entity";
import { NoFestivalFoundError, QueryBuilderError } from "../errors/custom-errors";
import { FestivalListResult } from "../interfaces/festival.interface";

export class FestivalService {
  private readonly festivalRepo = AppDataSource.getRepository(Festival);

  public async loadFestivals(
    page: number,
    limit: number,
    filters: { name?: string; location?: string; from?: string; to?: string }
  ): Promise<FestivalListResult> {
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

    await this.festivalRepo.delete(festival);
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
