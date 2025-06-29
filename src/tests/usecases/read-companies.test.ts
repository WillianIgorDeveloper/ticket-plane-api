import type { IRCompanies } from "@core"
import { CCompany, InMemory_CompanyR, InvalidError, RCompanies } from "@infra"
import { beforeAll, describe, expect, test } from "vitest"
import { NEW_COMPANY } from "../constants/_index"

const companyR = new InMemory_CompanyR()
const cCompany = new CCompany(companyR)
const sut = new RCompanies(companyR)
let createdCompanyID: string

describe("RCompanies usecase", () => {
  beforeAll(async () => {
    const result = await cCompany.execute({ newCompany: NEW_COMPANY })
    createdCompanyID = result.companyCreated.id
  })

  test("should return all companies when no companyID is provided", async () => {
    const params: IRCompanies.Params = {}
    const result = await sut.execute(params)
    expect(result).toHaveProperty("companiesFound")
    expect(Array.isArray(result.companiesFound)).toBe(true)
  })

  test("should return a specific company when companyID is provided", async () => {
    const params: IRCompanies.Params = { companyID: createdCompanyID }
    const result = await sut.execute(params)
    expect(result).toHaveProperty("companiesFound")
    expect(Array.isArray(result.companiesFound)).toBe(true)
  })

  test("should throw InvalidError if companyID does not exist", async () => {
    const params: IRCompanies.Params = { companyID: "non-existent" }
    await expect(sut.execute(params)).rejects.toBeInstanceOf(InvalidError)
  })
})
