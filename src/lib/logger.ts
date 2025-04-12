export function logError(message: string, data?: unknown) {
  console.error(`[Logger] ${message}`, data)

  // fetch('/api/log', { method: 'POST', body: JSON.stringify({ message, data }) })
}
