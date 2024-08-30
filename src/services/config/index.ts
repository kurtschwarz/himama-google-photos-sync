export const get = <T>(key: string, fallback: T): T => {
  return process.env?.[key] as T ?? fallback
}

export const require = <T>(key: string): T => {
  if (!(key in process.env)) {
    throw new Error(`${key} is required to be set in the env`)
  }

  return process.env?.[key] as T
}
