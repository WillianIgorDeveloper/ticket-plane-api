import { env, server } from "@infra"
import { v1 } from "@routes"

server.register(v1, { prefix: "/api/v1" })

server
  .listen({
    host: env.ENVIRONMENT === "development" ? "0.0.0.0" : undefined,
    port: env.PORT ?? 2000,
  })
  .then(() => {
    console.log(`Server is running on port ${env.PORT ?? 2000}`)
  })
  .catch((error) => {
    console.error(`Error starting server: ${error}`)
  })
