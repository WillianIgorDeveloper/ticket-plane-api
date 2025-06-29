export class DatabaseError extends Error {
  constructor({ message, code }: { message?: string; code: string }) {
    super(`${code} - ${message ?? "Unknown error on database query"}`)
    this.name = "DatabaseError"
  }
}
