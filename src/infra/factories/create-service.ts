import type { ICService } from "@core"
import { CService, Postgres_ServiceR } from "@infra"

export function createService(params: ICService.Params) {
  const serviceR = new Postgres_ServiceR()
  const crCreateService = new CService(serviceR).execute(params)
  return crCreateService
}
