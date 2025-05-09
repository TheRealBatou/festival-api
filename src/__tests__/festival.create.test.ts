import request from "supertest";
import app from "../app";
import { AppDataSource } from "../data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("creating a festival via POST API call", () => {
  it("should create a new festival and return it", async () => {
    const festivalData = {
      name: "Test Festival",
      date: "2026-07-07T10:00:00+02:00",
      location: "Germany",
      description: "Test Festival",
      imageUrl: "test_festival.jpg",
    };

    const response = await request(app).post("/api/v1/festivals").send(festivalData).expect(201);

    expect(response.body.name).toBe(festivalData.name);
    expect(response.body.date).toBe(festivalData.date);
    expect(response.body.location).toBe(festivalData.location);
    expect(response.body.description).toBe(festivalData.description);
    expect(response.body.imageUrl).toBe(festivalData.imageUrl);

    expect(response.body.festivalId).toBeDefined();
    expect(response.body.festivalId).not.toBeNull();
  });
});
