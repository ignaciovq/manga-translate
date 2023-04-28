export function getEnv (key: string) {
  const value = process.env[key]
  if (value == null) throw new Error(`Environment variable ${key} is missing`)
  return value
}
