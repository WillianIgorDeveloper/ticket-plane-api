import type { ITicket } from "@core"

export interface IRTickets {
  execute: (params: IRTickets.Params) => Promise<IRTickets.Result>
}

export namespace IRTickets {
  export type Params = {
    userID: string
  }
  export type Result = {
    ticketsFound: ITicket[]
  }
}
