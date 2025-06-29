import cors from "@fastify/cors"
import fastify from "fastify"

export const server = fastify()

const originsAllowed = [""]

server.register(cors, {
  origin: originsAllowed,
})
