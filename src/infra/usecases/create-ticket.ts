import { randomUUID } from "node:crypto"
import type { ICTicket, IClassR, IFlightR, IScheduleR, ISeatR, ITicketR, IUserR } from "@core"
import { checkSingleExistence } from "@infra"

export class CTicket implements ICTicket {
  constructor(
    private readonly ticketR: ITicketR,
    private readonly userR: IUserR,
    private readonly flightR: IFlightR,
    private readonly scheduleR: IScheduleR,
    private readonly classR: IClassR,
    private readonly seatR: ISeatR,
  ) {}

  async execute(params: ICTicket.Params): Promise<ICTicket.Result> {
    const { classID, flightID, scheduleID, seatID, userID } = params

    const { usersFound } = this.userR.read({ userID })
    checkSingleExistence<typeof usersFound>(usersFound)

    const { flightsFound } = this.flightR.read({ flightID })
    checkSingleExistence<typeof flightsFound>(flightsFound)

    const { schedulesFound } = this.scheduleR.read({ scheduleID })
    checkSingleExistence<typeof schedulesFound>(schedulesFound)

    const { classesFound } = this.classR.read({ classID })
    checkSingleExistence<typeof classesFound>(classesFound)

    const { seatsFound } = this.seatR.read({ seatID })
    const seat = checkSingleExistence<typeof seatsFound>(seatsFound)

    const { ticketCreated } = await this.ticketR.create({
      newTicket: {
        classID,
        flightID,
        scheduleID,
        seatID,
        userID,
        status: "pending",
        pricePayed: seat.price,
        id: randomUUID(),
        barCode: randomUUID(),
        createdAt: new Date(),
      },
    })

    return { ticketCreated }
  }
}
