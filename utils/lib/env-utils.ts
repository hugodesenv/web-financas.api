export function JWT_SECRET() {
  return process.env.JWT_SECRET ?? '';
}

export function API_CONFIG() {
  return {
    port: parseInt(String(process.env.API_PORT)) ?? 3000,
    openai_key: process.env.OPENAI_KEY ?? ""
  }
}