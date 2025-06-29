import type { IFlight } from "@core"

export interface IRFlights {
  execute: (params: IRFlights.Params) => Promise<IRFlights.Result>
}

export namespace IRFlights {
  export type Params = {
    flightID?: string
    company?: string
    destination?: string
    origin?: string
    class?: string
  }
  export type Result = {
    flightsFound: IFlight[]
  }
}
