import type { ICompany } from "@core"

namespace Company {
  export type NewCompany = Omit<
    ICompany,
    "id" | "createdAt" | "updatedAt" | "isActive" | "deleteDate"
  >
}

export const NEW_COMPANY: Company.NewCompany = {
  name: "New Company",
}
