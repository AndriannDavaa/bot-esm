/**
 * ╔════════════════════════════════════════════╗
 * ║               BASE BOT ESM 2025            ║
 * ║               Created by Andzz             ║
 * ║           https://github.com/Andzz         ║
 * ╚════════════════════════════════════════════╝
 *
 * ⚙ Versi      : 1.1.0
 * ⚙ Bahasa     : JavaScript (ESM)
 * ⚙ Library    : @whiskeysockets/baileys
 * ⚙ Lisensi    : MIT (c) 2025 Andzz
 */
 
//import axios from 'axios'
import { settings } from './settings.js'
import { delay } from './lib/allFunction.js'
import { getWaktu } from './lib/waktu.js'
import { getMainMenu } from './lib/menu.js'

export async function handleCase(sock, m) {
  const msg = m.messages[0]
  if (!msg.message || msg.key.fromMe) return

  const jid = msg.key.remoteJid
  const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
  const command = text.startsWith(settings.prefix) ? text.slice(1).split(" ")[0].toLowerCase() : ""
  const args = text.trim().split(" ").slice(1)

  switch (command) {
    case "ping":
      await sock.sendMessage(jid, { text: "Pong!" }, { quoted: msg })
      break
      case "menu":
  const menu = getMainMenu(settings)
  await sock.sendMessage(jid, { text: menu }, { quoted: msg})
  break
      case 'halo':
    const waktu = getWaktu()
    await sock.sendMessage(jid, { text: `Halo kak! Sekarang jam ${waktu}` }, { quoted: msg })
    await delay(1000)
    await sock.sendMessage(jid, { text: `Ini contoh delay 1 detik.` }, { quoted: msg })
    break
    

    case "pol":
      await sock.sendMessage(jid, {
        poll: {
          name: "Pilih salah satu ya!",
          values: ["Option 1", "Option 2", "Kacang"],
          selectableCount: 1
        }
      }, { quoted: msg })
      break
      case "owner":
  const ownerNum = settings.ownerNumber
  const ownerName = settings.ownerName

  const vcard = 'BEGIN:VCARD\n'
    + 'VERSION:3.0\n'
    + `FN:${ownerName}\n`
    + `ORG:${settings.botName};\n`
    + `TEL;type=CELL;type=VOICE;waid=${ownerNum}:${ownerNum.startsWith("62") ? "+" + ownerNum : ownerNum}\n`
    + 'END:VCARD'

  await sock.sendMessage(jid, {
    contacts: {
      displayName: ownerName,
      contacts: [{ vcard }]
    }
  }, { quoted: msg })
  break
  
  }
}
