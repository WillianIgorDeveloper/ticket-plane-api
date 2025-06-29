import type { TFlightStatus } from "@core"

export interface ITicket {
  userID: string
  flightID: string
  scheduleID: string
  classID: string
  seatID: string
  id: string
  pricePayed: number
  status: TFlightStatus
  barCode: string
  createdAt: Date
  updatedAt?: Date
}
