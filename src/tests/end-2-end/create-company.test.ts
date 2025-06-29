import type { ICCompany, IRCompanies } from "@core"
import { describe, expect, test } from "vitest"
import { NEW_COMPANY } from "../constants/_index"

const url = process.env.BASE_URL

type createCompany = {
  message: string
  status: number
  body: ICCompany.Result
}

type readCompanies = {
  message: string
  status: number
  body: IRCompanies.Result
}

let createdCompanyID: string

describe("CCompany controllers", () => {
  test("should create a company", async () => {
    const responseFetch = await fetch(`${url}/api/v1/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...NEW_COMPANY,
      }),
    })
    expect(responseFetch.status).toBe(201)
    const responseJson = (await responseFetch.json()) as createCompany
    expect(responseJson).toMatchObject<createCompany>
    createdCompanyID = responseJson.body.companyCreated.id
  })

  test("should return a company created", async () => {
    const responseFetch = await fetch(`${url}/api/v1/companies?companyID=${createdCompanyID}`)
    expect(responseFetch.status).toBe(200)
    const responseJson = (await responseFetch.json()) as readCompanies
    expect(responseJson).toMatchObject<readCompanies>
    expect(Array.isArray(responseJson.body.companiesFound)).toBe(true)
  })
})
