import type { IClass, IPlace, ISchedule, ITicketPrice } from "@core"

export interface IFlight {
  companyID: string
  id: string
  origin: IPlace
  destination: IPlace
  duration: number
  seatsAmount: number
  schedules: ISchedule[]
  classes: IClass[]
  ticketPrices: ITicketPrice[]
  createdAt: Date
  updatedAt: Date
}
