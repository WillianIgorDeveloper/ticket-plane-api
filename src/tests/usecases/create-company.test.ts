import type { ICCompany } from "@core"
import { CCompany, InMemory_CompanyR, RCompanies } from "@infra"
import { describe, expect, test } from "vitest"
import { NEW_COMPANY } from "../constants/_index"

const companyR = new InMemory_CompanyR()
const sut = new CCompany(companyR)
const rCompanies = new RCompanies(companyR)
let createdCompanyID: string

describe("CCompany usecase", () => {
  test("should create a company", async () => {
    const params: ICCompany.Params = { newCompany: NEW_COMPANY }
    const result = await sut.execute(params)
    expect(result).toHaveProperty("companyCreated")
    expect(result).toMatchObject<ICCompany.Result>
    createdCompanyID = result.companyCreated.id
  })

  test("should find a company created on database", async () => {
    const result = await rCompanies.execute({ companyID: createdCompanyID })
    expect(Array.isArray(result.companiesFound)).toBe(true)
  })
})
