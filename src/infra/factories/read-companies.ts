import type { IRCompanies } from "@core"
import { Postgres_CompanyR, RCompanies } from "@infra"

export function readCompanies(params: IRCompanies.Params) {
  const companyR = new Postgres_CompanyR()
  const crReadCompanies = new RCompanies(companyR).execute(params)
  return crReadCompanies
}
