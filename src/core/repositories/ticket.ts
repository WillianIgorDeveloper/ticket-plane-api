import type { ICompany, ITicket } from "@core"

export interface ITicketR {
  create: (params: ITicketR.Create.Params) => Promise<ITicketR.Create.Result>
  read: (params: ITicketR.Read.Params) => Promise<ITicketR.Read.Result>
}

export namespace ITicketR {
  export namespace Create {
    export type Params = {
      newTicket: ITicket
    }
    export type Result = {
      ticketCreated: ITicket
    }
  }

  export namespace Read {
    export type Params = {
      companyID?: string
    }
    export type Result = {
      companiesFound: ICompany[]
    }
  }
}
