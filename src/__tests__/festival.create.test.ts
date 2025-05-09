import request from "supertest";
import app from "../app";
import { AppDataSource } from "../data-source";

beforeAll(async () => {
  // initializes the database connection which is needed for the integration test
  await AppDataSource.initialize();
});

afterAll(async () => {
  // makes sure everything is shut down after the test
  await AppDataSource.destroy();
});

// integration test for the POST API call to create a festival
describe("creating a festival via POST API call", () => {
  it("should create a new festival and return it", async () => {
    // proper data to ensure a correct call for the creation of a festival
    const festivalData = {
      name: "Test Festival",
      date: "2026-07-07T10:00:00+02:00",
      location: "Germany",
      description: "Test Festival",
      imageUrl: "test_festival.jpg",
    };

    // tests if the status code is as expected (201 for created)
    const response = await request(app).post("/api/v1/festivals").send(festivalData).expect(201);

    // tests if all fields are filled and have the correct values from the input
    expect(response.body.name).toBe(festivalData.name);
    expect(response.body.date).toBe(festivalData.date);
    expect(response.body.location).toBe(festivalData.location);
    expect(response.body.description).toBe(festivalData.description);
    expect(response.body.imageUrl).toBe(festivalData.imageUrl);

    // tests if the ID is generated correctly
    expect(response.body.festivalId).toBeDefined();
    // tests if the ID is not null (not covered by toBeDefined())
    expect(response.body.festivalId).not.toBeNull();
  });
});
