import type { IService } from "@core"

namespace Service {
  export type NewService = Omit<
    IService,
    "id" | "companyID" | "createdAt" | "updatedAt" | "company_id"
  >
}

export const NEW_SERVICE: Service.NewService = {
  name: "New service",
  description: "Service for a company",
  price: 1000,
}
