import type { IRServices } from "@core"
import {
  CCompany,
  CService,
  InMemory_CompanyR,
  InMemory_ServiceR,
  InvalidError,
  RServices,
} from "@infra"
import { beforeAll, describe, expect, test } from "vitest"
import { NEW_COMPANY, NEW_SERVICE } from "../constants/_index"

const companyR = new InMemory_CompanyR()
const serviceR = new InMemory_ServiceR()
const cCompany = new CCompany(companyR)
const cService = new CService(serviceR)
const sut = new RServices(serviceR)
let createdServiceID: string
let createdCompanyID: string

describe("RServices usecase", () => {
  beforeAll(async () => {
    const companyResult = await cCompany.execute({ newCompany: NEW_COMPANY })
    createdCompanyID = companyResult.companyCreated.id
    const serviceResult = await cService.execute({
      newService: { ...NEW_SERVICE, companyID: createdCompanyID },
    })
    createdServiceID = serviceResult.serviceCreated.id
  })

  test("should return no services when no companyID is provided", async () => {
    const params: IRServices.Params = {}
    const result = await sut.execute(params)
    expect(result).toHaveProperty("servicesFound")
    expect(result.servicesFound).toEqual([])
  })

  test("should return a services of a company when companyID is provided", async () => {
    const params: IRServices.Params = { companyID: createdCompanyID }
    const result = await sut.execute(params)
    expect(result).toHaveProperty("servicesFound")
    expect(Array.isArray(result.servicesFound)).toBe(true)
  })

  test("should return a services when serviceID is provided", async () => {
    const params: IRServices.Params = { serviceID: createdServiceID }
    const result = await sut.execute(params)
    expect(result).toHaveProperty("servicesFound")
    expect(Array.isArray(result.servicesFound)).toBe(true)
  })

  test("should return an invalid error when companyID does not exist", async () => {
    const params: IRServices.Params = { companyID: "non-existent" }
    await expect(sut.execute(params)).rejects.toBeInstanceOf(InvalidError)
  })

  test("should return an invalid error if serviceID does not exist", async () => {
    const params: IRServices.Params = { serviceID: "non-existent" }
    await expect(sut.execute(params)).rejects.toBeInstanceOf(InvalidError)
  })
})
