// CustomError class as base for all custom errors so only one case is needed in the catch-blocks (not one for every different custom error)
export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NoFestivalFoundError extends CustomError {
  constructor() {
    super("No festival found", 404);
    this.name = "NoFestivalFoundError";
  }
}

export class QueryBuilderError extends CustomError {
  constructor() {
    super("Error during creation of QueryBuilder", 500);
    this.name = "QueryBuilderError";
  }
}

export class InvalidFestivalIdError extends CustomError {
  constructor() {
    super("Invalid festival ID", 400);
    this.name = "InvalidFestivalId";
  }
}

export class InvalidUpdateInputError extends CustomError {
  constructor(message: string) {
    super(message, 400);
    this.name = "InvalidUpdateInput";
  }
}
