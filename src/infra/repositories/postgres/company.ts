import { randomUUID } from "node:crypto"
import type { ICompany, ICompanyR } from "@core"
import { DatabaseError, pg } from "@infra"

export class Postgres_CompanyR implements ICompanyR {
  async create(params: ICompanyR.Create.Params): Promise<ICompanyR.Create.Result> {
    const { newCompany } = params

    try {
      const [companyCreated] = await pg<ICompany[]>`
        INSERT INTO Company
          (id, name, "isActive", "deleteDate", "createdAt", "updatedAt")
        VALUES
          (${randomUUID()}, ${newCompany.name}, true, null, ${new Date()}, ${new Date()})
        RETURNING *
      `

      return { companyCreated }
    } catch (error) {
      const message = (error as Error)?.message
      throw new DatabaseError({ message, code: "cc69db4b" })
    }
  }

  async read(params: ICompanyR.Read.Params): Promise<ICompanyR.Read.Result> {
    const { companyID } = params

    function companyFilter() {
      if (companyID) return pg`AND id = ${companyID}`
      return pg``
    }

    try {
      const companiesFound = await pg<ICompany[]>`
        SELECT * FROM Company
        WHERE 1 = 1
        ${companyFilter()}
      `

      return { companiesFound }
    } catch (error) {
      const message = (error as Error)?.message
      throw new DatabaseError({ message, code: "e4c158ee" })
    }
  }
}
