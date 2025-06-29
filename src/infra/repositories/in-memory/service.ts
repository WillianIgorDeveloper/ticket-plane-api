import { randomUUID } from "node:crypto"
import type { IService, IServiceR } from "@core"

export class InMemory_ServiceR implements IServiceR {
  private services: IService[] = []

  async create(params: IServiceR.Create.Params): Promise<IServiceR.Create.Result> {
    const { newService } = params
    const id = randomUUID()

    this.services.push({
      ...newService,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return {
      serviceCreated: {
        ...newService,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  }

  async read(params: IServiceR.Read.Params): Promise<IServiceR.Read.Result> {
    const { serviceID, companyID } = params
    let servicesFound: IService[] = []

    if (serviceID) {
      servicesFound = this.services.filter((service) => service.id === serviceID)
    } else if (companyID) {
      servicesFound = this.services.filter((service) => service.companyID === companyID)
    } else {
      servicesFound = []
    }

    return { servicesFound }
  }
}
