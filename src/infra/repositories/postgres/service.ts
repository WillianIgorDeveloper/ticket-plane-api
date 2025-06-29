import type { IService, IServiceR } from "@core"
import { DatabaseError, pg } from "@infra"

export class Postgres_ServiceR implements IServiceR {
  async create(params: IServiceR.Create.Params): Promise<IServiceR.Create.Result> {
    const { newService } = params
    try {
      const [serviceCreated] = await pg<IService[]>`
        INSERT INTO Service
          (id, name, description, price, company_id, "createdAt", "updatedAt")
        VALUES
          (${newService.id}, ${newService.name}, ${newService.description}, ${newService.price}, ${newService.companyID}, ${newService.createdAt}, ${newService.updatedAt})
        RETURNING *
      `

      return { serviceCreated }
    } catch (error) {
      const message = (error as Error)?.message
      throw new DatabaseError({ message, code: "a2d44319" })
    }
  }

  async read(params: IServiceR.Read.Params): Promise<IServiceR.Read.Result> {
    const { serviceID, companyID } = params

    function serviceID_Filter() {
      if (serviceID) return pg`AND id = ${serviceID}`
      return pg``
    }

    function companyID_Filter() {
      if (companyID) return pg`AND company_id = ${companyID}`
      return pg``
    }

    try {
      const servicesFound = await pg<IService[]>`
        SELECT * FROM Service
        WHERE 1 = 1
        ${serviceID_Filter()}
        ${companyID_Filter()}
      `

      return { servicesFound }
    } catch (error) {
      const message = (error as Error)?.message
      throw new DatabaseError({ message, code: "2a213542" })
    }
  }
}
