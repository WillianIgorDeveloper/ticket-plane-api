export class UnauthorizedError extends Error {
  constructor() {
    super("User unauthorized")
    this.name = "UnauthorizedError"
  }
}
