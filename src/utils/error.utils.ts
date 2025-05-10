// utility function to create a normalized error message
// because Winston logger calls don't accept errors with an unknown type
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
