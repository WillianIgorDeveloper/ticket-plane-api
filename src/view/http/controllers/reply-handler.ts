import type { FastifyReply } from "fastify"

export type ReplyHandlerProps = {
  reply: FastifyReply
  message?: string
  code?: number
  body: unknown
}

export class ReplyHandler {
  send({ reply, message, body, code = 200 }: ReplyHandlerProps) {
    return reply.status(code).send({
      success: true,
      message: message ?? "Request successful",
      body: body,
    })
  }
}
