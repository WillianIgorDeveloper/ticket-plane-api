import type { ICCompany } from "@core"
import { CCompany, Postgres_CompanyR } from "@infra"

export function createCompany(params: ICCompany.Params) {
  const companyR = new Postgres_CompanyR()
  const crCreateCompany = new CCompany(companyR).execute(params)
  return crCreateCompany
}
