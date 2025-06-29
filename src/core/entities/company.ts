import type { IFlight } from "@core"

export interface ICompany {
  id: string
  name: string
  reputation: number
  flights: IFlight[]
  createdAt: Date
  updatedAt: Date
}
