import { EnvironmentError } from "@infra"
import { z } from "zod"

const envSchema = z.object({
  ENVIRONMENT: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(2000),
  BASE_URL: z.string(),
  PG_PORT: z.coerce.number(),
  PG_USER: z.string(),
  PG_HOST: z.string(),
  PG_DATABASE: z.string(),
  PG_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(`Invalid environment variables ${_env.error}`)
  throw new EnvironmentError()
}

export const env = _env.data
