// lib/menu.js
export function getMainMenu(settings) {
  return `
╔═〔 ${settings.botName} 〕
║
║  Halo! Ini adalah menu utama.
║
╠═〘 FITUR UMUM 〙
║• .ping
║• .sticker
║• .tiktok [url]
║• .yt [url]
║
╚═〘 © ${settings.ownerName} 〙
`
}
