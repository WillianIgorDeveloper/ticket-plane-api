export function checkSingleExistence<T = unknown>(params: T[]): T {
  if (!params) throw new Error("")

  if (params.length === 0) throw new Error("")

  if (params.length > 1) throw new Error("")

  return params[0]
}
