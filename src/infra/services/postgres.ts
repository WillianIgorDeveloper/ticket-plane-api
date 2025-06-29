import postgres from "postgres"

export const pg = postgres({
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER as string,
  database: process.env.PG_DATABASE as string,
  password: process.env.PG_PASSWORD as string,
})
