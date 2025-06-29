import type { ITicket } from "@core"

export interface ICTicket {
  execute: (params: ICTicket.Params) => Promise<ICTicket.Result>
}

export namespace ICTicket {
  export type Params = {
    userID: string
    flightID: string
    scheduleID: string
    classID: string
    seatID: string
  }
  export type Result = {
    ticketCreated: ITicket
  }
}
