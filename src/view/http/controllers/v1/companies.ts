import { createCompany, readCompanies, readCompanyServices } from "@infra"
import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { ErrorHandler } from "../error-handler"
import { ReplyHandler } from "../reply-handler"

const replyHandler = new ReplyHandler()
const errorHandler = new ErrorHandler()

const getSchema = z.object({
  companyID: z.string().optional(),
})

const postSchema = z.object({
  name: z.string(),
})

const getServicesSchema = z.object({
  companyID: z.string(),
})

export async function companies(server: FastifyInstance) {
  server.get("/", async (request, reply) => {
    try {
      const { companyID } = getSchema.parse(request.query)
      const { companiesFound } = await readCompanies({ companyID })
      replyHandler.send({
        reply,
        message: "Companies read successful",
        body: { companiesFound },
      })
    } catch (error) {
      errorHandler.send({ error, reply })
    }
  })

  server.post("/", async (request, reply) => {
    try {
      const { name } = postSchema.parse(request.body)
      const { companyCreated } = await createCompany({ newCompany: { name } })
      replyHandler.send({
        reply,
        code: 201,
        message: "Company create successful",
        body: { companyCreated },
      })
    } catch (error) {
      errorHandler.send({ error, reply })
    }
  })

  server.get("/services/:companyID", async (request, reply) => {
    try {
      const { companyID } = getServicesSchema.parse(request.params)
      const { companyServices } = await readCompanyServices({ companyID })
      replyHandler.send({
        reply,
        message: "Company Services read successful",
        body: { companyServices },
      })
    } catch (error) {
      errorHandler.send({ error, reply })
    }
  })
}
