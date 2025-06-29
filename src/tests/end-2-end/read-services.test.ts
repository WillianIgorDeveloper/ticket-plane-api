import type { IRServices } from "@core"
import { Postgres_CompanyR, Postgres_ServiceR } from "@infra"
import { CCompany, CService } from "@infra"
import { beforeAll, describe, expect, test } from "vitest"
import { NEW_COMPANY } from "../constants/company"
import { NEW_SERVICE } from "../constants/service"

const url = process.env.BASE_URL

type readServices = {
  message: string
  status: number
  body: IRServices.Result
}

const companyR = new Postgres_CompanyR()
const serviceR = new Postgres_ServiceR()
const cCompany = new CCompany(companyR)
const cService = new CService(serviceR)
let createdCompanyID: string
let createdServiceID: string

describe("RServices controllers", () => {
  beforeAll(async () => {
    const companyResult = await cCompany.execute({ newCompany: NEW_COMPANY })
    createdCompanyID = companyResult.companyCreated.id
    const serviceResult = await cService.execute({
      newService: { ...NEW_SERVICE, companyID: createdCompanyID },
    })
    createdServiceID = serviceResult.serviceCreated.id
  })

  test("should return a service", async () => {
    const responseFetch = await fetch(
      `${url}/api/v1/services/${createdCompanyID}?serviceID=${createdServiceID}`,
    )
    expect(responseFetch.status).toBe(200)
    const responseJson = (await responseFetch.json()) as readServices
    expect(Array.isArray(responseJson.body.servicesFound)).toBe(true)
  })

  test("should return a 400 error when the company does not exist", async () => {
    const responseFetch = await fetch(
      `${url}/api/v1/services/not-exist?serviceID=${createdServiceID}`,
    )
    expect(responseFetch.status).toBe(400)
    const responseJson = (await responseFetch.json()) as readServices
    expect(responseJson).toMatchObject<readServices>
  })

  test("should return a 400 error when the service does not exist", async () => {
    const responseFetch = await fetch(
      `${url}/api/v1/services/${createdCompanyID}?serviceID=not-exist`,
    )
    expect(responseFetch.status).toBe(400)
    const responseJson = (await responseFetch.json()) as readServices
    expect(responseJson).toMatchObject<readServices>
  })
})
