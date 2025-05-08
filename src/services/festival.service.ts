import { AppDataSource } from "../data-source";
import { Festival } from "../entities/festival.entity";
import { NoFestivalFoundError } from "../errors/custom-errors";

export class FestivalService {
  private readonly festivalRepo = AppDataSource.getRepository(Festival);

  public async loadFestivals() {
    const festivals = await this.festivalRepo.find();

    if (!festivals) {
      throw new NoFestivalFoundError();
    }

    return festivals;
  }
}
