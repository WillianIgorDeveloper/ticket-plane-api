import type { FastifyInstance } from "fastify"
import { ErrorHandler } from "../error-handler"
import { ReplyHandler } from "../reply-handler"

const replyHandler = new ReplyHandler()
const errorHandler = new ErrorHandler()

export async function check(server: FastifyInstance) {
  server.get("/", async (_, reply) => {
    try {
      replyHandler.send({
        reply,
        message: "API is running",
        body: {},
      })
    } catch (error) {
      errorHandler.send({ error, reply })
    }
  })
}
