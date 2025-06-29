import { randomUUID } from "node:crypto"
import type { ICompany, ICompanyR } from "@core"

export class InMemory_CompanyR implements ICompanyR {
  private companies: ICompany[] = []

  async create(params: ICompanyR.Create.Params): Promise<ICompanyR.Create.Result> {
    const { newCompany } = params
    const id = randomUUID()

    this.companies.push({
      ...newCompany,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    })

    return {
      companyCreated: {
        ...newCompany,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      },
    }
  }

  async read(params: ICompanyR.Read.Params): Promise<ICompanyR.Read.Result> {
    const { companyID } = params
    let companiesFound: ICompany[] = []

    if (companyID) {
      const found = this.companies.find((company) => company.id === companyID)
      companiesFound = found ? [found] : []
    } else {
      companiesFound = this.companies
    }

    return { companiesFound }
  }
}
