import type { ICCompany, ICService } from "@core"
import { CCompany, CService, InMemory_CompanyR, InMemory_ServiceR, RServices } from "@infra"
import { beforeAll, describe, expect, test } from "vitest"
import { NEW_COMPANY, NEW_SERVICE } from "../constants/_index"

const companyR = new InMemory_CompanyR()
const serviceR = new InMemory_ServiceR()
const cCompany = new CCompany(companyR)
const rServices = new RServices(serviceR)
const sut = new CService(serviceR)
let createdCompanyID: string
let createdServiceID: string

describe("CService usecase", () => {
  beforeAll(async () => {
    const result = await cCompany.execute({ newCompany: NEW_COMPANY })
    createdCompanyID = result.companyCreated.id
  })

  test("should create a service", async () => {
    const params: ICService.Params = {
      newService: { ...NEW_SERVICE, companyID: createdCompanyID },
    }
    const result = await sut.execute(params)
    expect(result).toHaveProperty("serviceCreated")
    expect(result).toMatchObject<ICCompany.Result>
    createdServiceID = result.serviceCreated.id
  })

  test("should find a service created on database", async () => {
    const result = await rServices.execute({
      companyID: createdCompanyID,
      serviceID: createdServiceID,
    })
    expect(Array.isArray(result.servicesFound)).toBe(true)
  })
})
