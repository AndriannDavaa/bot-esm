export const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export const isUrl = (url) => {
  return /https?:\/\//.test(url)
}
