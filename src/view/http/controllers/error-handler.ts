import { InvalidError, UnauthorizedError, env } from "@infra"
import type { FastifyReply } from "fastify"
import { ZodError } from "zod"

type ErrorHandlerProps = {
  error: unknown
  reply: FastifyReply
}

export class ErrorHandler {
  send({ error, reply }: ErrorHandlerProps) {
    if (env.ENVIRONMENT === "development") {
      console.error(error)
    }

    switch (true) {
      case error instanceof InvalidError:
        return reply.status(400).send({
          success: false,
          error: error.name,
          message: error.message,
        })
      case error instanceof ZodError:
        return reply.status(400).send({
          success: false,
          error: error.errors,
          message: error.format(),
        })
      case error instanceof UnauthorizedError:
        return reply.status(401).send({
          success: false,
          error: error.name,
          message: error.message,
        })
      default:
        return reply.status(500).send({
          success: false,
          error: "InternalServerError",
          message: "Internal Server Error",
        })
    }
  }
}
