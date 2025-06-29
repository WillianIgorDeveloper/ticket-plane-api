import type { ISeat } from "@core"

export interface IClass {
  flightID: string
  id: string
  name: string
  seats: ISeat[]
  createdAt: Date
  updatedAt: Date
}
