import { createService, readServices } from "@infra"
import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { ErrorHandler } from "../error-handler"
import { ReplyHandler } from "../reply-handler"

const replyHandler = new ReplyHandler()
const errorHandler = new ErrorHandler()

const getSchemaParams = z.object({
  companyID: z.string(),
})

const getSchemaQuery = z.object({
  serviceID: z.string().optional(),
})

const postSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  companyID: z.string(),
})

export async function services(server: FastifyInstance) {
  server.get("/:companyID", async (request, reply) => {
    try {
      const { companyID } = getSchemaParams.parse(request.params)
      const { serviceID } = getSchemaQuery.parse(request.query)
      const { servicesFound } = await readServices({ companyID, serviceID })
      replyHandler.send({
        reply,
        message: "Services read successful",
        body: { servicesFound },
      })
    } catch (error) {
      errorHandler.send({ error, reply })
    }
  })

  server.post("/", async (request, reply) => {
    try {
      const body = postSchema.parse(request.body)
      const { serviceCreated } = await createService({ newService: { ...body } })
      replyHandler.send({
        reply,
        code: 201,
        message: "Service create successful",
        body: { serviceCreated },
      })
    } catch (error) {
      errorHandler.send({ error, reply })
    }
  })
}
