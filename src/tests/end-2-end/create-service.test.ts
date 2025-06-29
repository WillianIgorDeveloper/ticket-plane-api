import type { ICService, IRServices } from "@core"
import { CCompany, Postgres_CompanyR } from "@infra"
import { beforeAll, describe, expect, test } from "vitest"
import { NEW_COMPANY, NEW_SERVICE } from "../constants/_index"

const url = process.env.BASE_URL

type createService = {
  message: string
  status: number
  body: ICService.Result
}

type readServices = {
  message: string
  status: number
  body: IRServices.Result
}

const companyR = new Postgres_CompanyR()
const cCompany = new CCompany(companyR)
let createdCompanyID: string
let createdServiceID: string

describe("CService controllers", () => {
  beforeAll(async () => {
    const result = await cCompany.execute({ newCompany: NEW_COMPANY })
    createdCompanyID = result.companyCreated.id
  })

  test("should create a service", async () => {
    const responseFetch = await fetch(`${url}/api/v1/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...NEW_SERVICE,
        companyID: createdCompanyID,
      }),
    })
    expect(responseFetch.status).toBe(201)
    const responseJson = (await responseFetch.json()) as createService
    expect(responseJson).toMatchObject<createService>
    createdServiceID = responseJson.body.serviceCreated.id
  })

  test("should return a service created", async () => {
    const responseFetch = await fetch(
      `${url}/api/v1/services/${createdCompanyID}?serviceID=${createdServiceID}`,
    )
    expect(responseFetch.status).toBe(200)
    const responseJson = (await responseFetch.json()) as readServices
    expect(responseJson).toMatchObject<readServices>
    expect(Array.isArray(responseJson.body.servicesFound)).toBe(true)
  })
})
