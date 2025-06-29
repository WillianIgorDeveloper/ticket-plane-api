import * as v1Controllers from "@v1Controllers"
import type { FastifyInstance } from "fastify"

export async function v1(server: FastifyInstance) {
  server.register(v1Controllers.check, { prefix: "/check" })
  server.register(v1Controllers.companies, { prefix: "/companies" })
  server.register(v1Controllers.services, { prefix: "/services" })
}
