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
