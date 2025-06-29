import type { IRCompanyServices } from "@core"
import { CCompany, CService, InvalidError, RCompanyServices } from "@infra"
import { InMemory_CompanyR, InMemory_ServiceR } from "@infra"
import { beforeAll, describe, expect, test } from "vitest"
import { NEW_COMPANY, NEW_SERVICE } from "../constants/_index"

const companyR = new InMemory_CompanyR()
const serviceR = new InMemory_ServiceR()
const cCompany = new CCompany(companyR)
const cService = new CService(serviceR)
const sut = new RCompanyServices(companyR, serviceR)
let createdCompanyID: string

describe("RCompanyServices usecase", () => {
  beforeAll(async () => {
    const result = await cCompany.execute({ newCompany: NEW_COMPANY })
    await cService.execute({
      newService: { ...NEW_SERVICE, companyID: result.companyCreated.id },
    })
    createdCompanyID = result.companyCreated.id
  })

  test("should return a company with services when companyID is provided", async () => {
    const params: IRCompanyServices.Params = { companyID: createdCompanyID }
    const result = await sut.execute(params)
    expect(result).toHaveProperty("companyServices")
    expect(result).toMatchObject<IRCompanyServices.Result>
  })

  test("should return an error if company does not exist", async () => {
    const params: IRCompanyServices.Params = { companyID: "non-existent" }
    await expect(sut.execute(params)).rejects.toBeInstanceOf(InvalidError)
  })
})
