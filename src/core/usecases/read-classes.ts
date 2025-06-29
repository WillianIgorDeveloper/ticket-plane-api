import type { IClass } from "@core"

export interface IRClasses {
  execute: (params: IRClasses.Params) => Promise<IRClasses.Result>
}

export namespace IRClasses {
  export type Params = {
    companyID: string
    flightID: string
  }
  export type Result = {
    classesFound: IClass[]
  }
}
