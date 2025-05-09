import { validateFestivalUpdateInput } from "../utils/validation.utils";
import { InvalidUpdateInputError } from "../errors/custom-errors";

describe("validateFestivalUpdateInput", () => {
  it("should return validated data when all filled fields are valid", () => {
    const validInput = {
      name: "Test Festival",
      date: "2025-07-07T08:00:00+02:00",
      location: "Germany",
      description: "Test Description",
      imageUrl: "test_image.jpg",
    };

    const result = validateFestivalUpdateInput(validInput);

    expect(result).toEqual(validInput);
  });

  it("should accept an object with only some fields filled", () => {
    const partialInput = {
      name: "Test Festival",
      description: "Test Description",
    };

    const result = validateFestivalUpdateInput(partialInput);

    expect(result).toEqual(partialInput);
  });

  it("should throw an InvalidUpdateInputError when the input is empty", () => {
    const emptyInput = {};

    expect(() => validateFestivalUpdateInput(emptyInput)).toThrow(InvalidUpdateInputError);
  });
});
