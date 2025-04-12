export async function retry<T>(
  fn: () => Promise<T>,
  times: number = 3,
  delay: number = 500
): Promise<T> {
  let attempt = 0
  while (attempt < times) {
    try {
      return await fn()
    } catch (err) {
      attempt++
      if (attempt === times) throw err
      await new Promise(res => setTimeout(res, delay))
    }
  }
  throw new Error('Retry attempts exhausted')
}
