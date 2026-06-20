export function formatCurrency(amount: number): string {
  return `₡${amount.toLocaleString("es-CR")}`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("es-CR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return "Buenos días"
  if (h < 18) return "Buenas tardes"
  return "Buenas noches"
}

export function getTodayString(): string {
  const str = new Date().toLocaleDateString("es-CR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  return str.charAt(0).toUpperCase() + str.slice(1)
}
