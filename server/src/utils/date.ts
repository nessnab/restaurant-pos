export function getRestaurantDate() {
  const now = new Date()

  const jakartaDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now)

  return new Date(`${jakartaDate}T00:00:00.000Z`)
}