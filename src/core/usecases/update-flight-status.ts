import type { TFlightStatus } from "@core"

export interface IUFlightStatus {
  execute: (params: IUFlightStatus.Params) => Promise<void>
}

export namespace IUFlightStatus {
  export type Params = {
    ticketID: string
    status: TFlightStatus
  }
}
