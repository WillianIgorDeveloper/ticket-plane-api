import type { IRCompanies } from "@core"
import { CCompany, Postgres_CompanyR } from "@infra"
import { beforeAll, describe, expect, test } from "vitest"
import { NEW_COMPANY } from "../constants/_index"

const url = process.env.BASE_URL

type readCompanies = {
  message: string
  status: number
  body: IRCompanies.Result
}

const companyR = new Postgres_CompanyR()
const cCompany = new CCompany(companyR)
let createdCompanyID: string

describe("RCompanies controllers", () => {
  beforeAll(async () => {
    const result = await cCompany.execute({ newCompany: NEW_COMPANY })
    createdCompanyID = result.companyCreated.id
  })

  test("should return all companies", async () => {
    const responseFetch = await fetch(`${url}/api/v1/companies`)
    expect(responseFetch.status).toBe(200)
    const responseJson = (await responseFetch.json()) as readCompanies
    expect(responseJson).toMatchObject<readCompanies>
    expect(Array.isArray(responseJson.body.companiesFound)).toBe(true)
  })

  test("should return a specific company", async () => {
    const responseFetch = await fetch(`${url}/api/v1/companies?companyID=${createdCompanyID}`)
    expect(responseFetch.status).toBe(200)
    const responseJson = (await responseFetch.json()) as readCompanies
    expect(responseJson).toMatchObject<readCompanies>
    expect(Array.isArray(responseJson.body.companiesFound)).toBe(true)
  })

  test("should return a 400 error with a invalid company", async () => {
    const responseFetch = await fetch(`${url}/api/v1/companies?companyID=not-exist`)
    expect(responseFetch.status).toBe(400)
    const responseJson = (await responseFetch.json()) as readCompanies
    expect(responseJson).toMatchObject<readCompanies>
  })
})
