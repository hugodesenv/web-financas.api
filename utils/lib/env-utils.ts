export function JWT_SECRET() {
  return process.env.JWT ?? '';
}