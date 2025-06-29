export class EnvironmentError extends Error {
  constructor() {
    super("Invalid environment variables")
    this.name = "EnvironmentError"
  }
}
