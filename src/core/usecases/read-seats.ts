import type { ISeat } from "@core"

export interface IRSeats {
  execute: (params: IRSeats.Params) => Promise<IRSeats.Result>
}

export namespace IRSeats {
  export type Params = {
    companyID: string
    flightID: string
    classID: string
  }
  export type Result = {
    classesFound: ISeat[]
  }
}
