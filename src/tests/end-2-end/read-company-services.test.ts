import type { IRCompanyServices } from "@core"
import { Postgres_CompanyR, Postgres_ServiceR } from "@infra"
import { CCompany, CService } from "@infra"
import { beforeAll, describe, expect, test } from "vitest"
import { NEW_COMPANY, NEW_SERVICE } from "../constants/_index"

const url = process.env.BASE_URL

type readCompanyService = {
  message: string
  status: number
  body: IRCompanyServices.Result
}

const companyR = new Postgres_CompanyR()
const serviceR = new Postgres_ServiceR()
const cCompany = new CCompany(companyR)
const cService = new CService(serviceR)
let createdCompanyID: string

describe("RCompanyServices controllers", () => {
  beforeAll(async () => {
    const companyResult = await cCompany.execute({ newCompany: NEW_COMPANY })
    createdCompanyID = companyResult.companyCreated.id
    await cService.execute({ newService: { ...NEW_SERVICE, companyID: createdCompanyID } })
  })

  test("should return a company with services", async () => {
    const responseFetch = await fetch(`${url}/api/v1/companies/services/${createdCompanyID}`)
    expect(responseFetch.status).toBe(200)
    const responseJson = (await responseFetch.json()) as readCompanyService
    expect(responseJson).toMatchObject<readCompanyService>
  })

  test("should return a 400 error when the company does not exist", async () => {
    const responseFetch = await fetch(`${url}/api/v1/companies/services/not-exist`)
    expect(responseFetch.status).toBe(400)
    const responseJson = (await responseFetch.json()) as readCompanyService
    expect(responseJson).toMatchObject<readCompanyService>
  })
})
