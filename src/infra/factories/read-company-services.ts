import type { IRCompanyServices } from "@core"
import { Postgres_CompanyR, Postgres_ServiceR, RCompanyServices } from "@infra"

export function readCompanyServices(params: IRCompanyServices.Params) {
  const companyR = new Postgres_CompanyR()
  const serviceR = new Postgres_ServiceR()
  const crReadCompanyServices = new RCompanyServices(companyR, serviceR).execute(params)
  return crReadCompanyServices
}
