export const getWaktu = () => {
  const d = new Date()
  return `${d.getHours()}:${d.getMinutes()} WIB`
}
