import { validateFestivalUpdateInput } from "../utils/validation.utils";
import { InvalidUpdateInputError } from "../errors/custom-errors";

// unit tests for the function to validate the user-input for the update call
describe("validateFestivalUpdateInput", () => {
  // test with all fields filled
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

  // test with some fields filled
  it("should accept an object with only some fields filled", () => {
    const partialInput = {
      name: "Test Festival",
      description: "Test Description",
    };

    const result = validateFestivalUpdateInput(partialInput);

    expect(result).toEqual(partialInput);
  });

  // testing if the correct error is thrown if the input is empty
  it("should throw an InvalidUpdateInputError when the input is empty", () => {
    const emptyInput = {};

    expect(() => validateFestivalUpdateInput(emptyInput)).toThrow(InvalidUpdateInputError);
  });
});
