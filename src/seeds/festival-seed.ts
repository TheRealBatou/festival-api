import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import { Festival } from "../entities/festival.entity";

async function festivalSeed() {
  await AppDataSource.initialize();

  const festivalRepo = AppDataSource.getRepository(Festival);

  const existingFestivals = await festivalRepo.find();
  if (existingFestivals.length === 0) {
    const festivals: Festival[] = [];

    const rockAmRing = festivalRepo.create({
      name: "Rock am Ring",
      date: "2025-06-10T10:00:00+02:00",
      location: "Nuerburgring, Germany",
      description: "Rock am Ring",
      imageUrl: "rock_am_ring.jpg",
    });
    festivals.push(rockAmRing);
    const coachella = festivalRepo.create({
      name: "Coachella",
      date: "2025-05-10T10:00:00+02:00",
      location: "Indio, California",
      description: "Coachella",
      imageUrl: "coachella.jpg",
    });
    festivals.push(coachella);
    const tomorrowland = festivalRepo.create({
      name: "Tomorrowland",
      date: "2025-07-05T08:00:00+02:00",
      location: "Antwerp, Belgium",
      description: "Tomorrowland",
      imageUrl: "tomorrowland.jpg",
    });
    festivals.push(tomorrowland);
    const lollapalooza = festivalRepo.create({
      name: "Lollapalooza",
      date: "2025-06-10T10:00:00+02:00",
      location: "Grant Park, Chicago",
      description: "Lollapalooza",
      imageUrl: "lollapalooza.jpg",
    });
    festivals.push(lollapalooza);
    const rockInRio = festivalRepo.create({
      name: "Rock in Rio",
      date: "2025-06-10T10:00:00+02:00",
      location: "Rio de Janeiro",
      description: "Rock in Rio",
      imageUrl: "rock_in_rio.jpg",
    });
    festivals.push(rockInRio);
    const glastonbury = festivalRepo.create({
      name: "Glastonbury",
      date: "2025-06-10T10:00:00+02:00",
      location: "Somerset, England",
      description: "Glastonbury",
      imageUrl: "glastonbury.jpg",
    });
    festivals.push(glastonbury);
    const fujiRockFestival = festivalRepo.create({
      name: "Fuji Rock Festival",
      date: "2025-06-10T10:00:00+02:00",
      location: "Naeba, Japan",
      description: "Fuji Rock Festival",
      imageUrl: "fujiRockFestival.jpg",
    });
    festivals.push(fujiRockFestival);
    const austinCityLimits = festivalRepo.create({
      name: "Austin City Limits",
      date: "2026-02-05T08:00:00+02:00",
      location: "Austin, Texas",
      imageUrl: "austinCityLimits.jpg",
    });
    festivals.push(austinCityLimits);
    const sziget = festivalRepo.create({
      name: "Sziget",
      date: "2025-06-10T10:00:00+02:00",
      location: "Budapest, Hungary",
      description: "Sziget",
    });
    festivals.push(sziget);
    const wackenOpenAir = festivalRepo.create({
      name: "Wacken Open Air",
      date: "2026-05-05T08:00:00+02:00",
      location: "Wacken, Germany",
    });
    festivals.push(wackenOpenAir);

    await festivalRepo.save(festivals);
    console.log("Seed completed");
  } else {
    console.log("Database already seeded");
  }

  await AppDataSource.destroy();
}

// Catches errors during the seed-process and logs and exits with 1 (failure exit)
festivalSeed().catch((error) => {
  console.error("Seed error: ", error);
  process.exit(1);
});
