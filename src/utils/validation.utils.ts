import { Festival } from "../entities/festival.entity";
import { InvalidUpdateInputError } from "../errors/custom-errors";
import { FestivalUpdateDTO } from "../interfaces/festivalUpdateDTO.interface";
import logger from "../logger/logger";

// function validates the input data you receive and creates an Partial<Festival> object
// every field is tested for typeof "string" and if the string only consists of whitespace characters
// mandatory fields throw errors if they're empty
export function validateFestivalUpdateInput(input: FestivalUpdateDTO): Partial<Festival> {
  const validatedData: Partial<Festival> = {};

  logger.debug("Entering method: validateFestivalUpdateInput()");
  logger.info(`Validate the festival update input: ${JSON.stringify(input)}`);

  if (typeof input.name === "string" && input.name.trim() !== "") {
    logger.debug(`Name is valid: ${input.name}`);
    validatedData.name = input.name.trim();
  } else if (input.name !== undefined) {
    throw new InvalidUpdateInputError("Invalid name provided");
  }

  if (typeof input.date === "string" && input.date.trim() !== "") {
    // date-string is parsed to Date to validate correct ISO-8601 format
    const parsedDate = Date.parse(input.date.trim());
    if (isNaN(parsedDate)) {
      throw new InvalidUpdateInputError("Invalid ISO-8601 format for date field");
    }

    logger.debug(`Date is valid: ${input.date}`);
    validatedData.date = input.date.trim();
  } else if (input.date !== undefined) {
    throw new InvalidUpdateInputError("Invalid date provided (ISO-8601 format needed)");
  }

  if (typeof input.location === "string" && input.location.trim() !== "") {
    logger.debug(`Location is valid: ${input.location}`);
    validatedData.location = input.location.trim();
  } else if (input.location !== undefined) {
    throw new InvalidUpdateInputError("Invalid location provided");
  }

  if (typeof input.description === "string") {
    logger.debug(`Location is valid: ${input.description}`);
    validatedData.description = input.description.trim();
  }

  if (typeof input.imageUrl === "string") {
    logger.debug(`Location is valid: ${input.imageUrl}`);
    validatedData.imageUrl = input.imageUrl.trim();
  }

  // If not a single input field is correct
  if (Object.keys(validatedData).length === 0) {
    throw new InvalidUpdateInputError("No valid fields for update provided");
  }

  logger.info(`Validated Data: ${JSON.stringify(validatedData)}`);

  return validatedData;
}
