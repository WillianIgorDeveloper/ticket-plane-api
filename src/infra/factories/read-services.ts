import type { IRServices } from "@core"
import { Postgres_ServiceR, RServices } from "@infra"

export function readServices(params: IRServices.Params) {
  const serviceR = new Postgres_ServiceR()
  const crReadServices = new RServices(serviceR).execute(params)
  return crReadServices
}
