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
 
import baileys from '@whiskeysockets/baileys'
import pino from 'pino'
import chalk from 'chalk'
import readline from 'readline'
import { settings } from './settings.js'
import { handleCase } from './case.js'

const {
  default: makeWASocket,
  useMultiFileAuthState,
} = baileys

const usePairingCode = true

async function question(promt) {
  process.stdout.write(promt)
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((resolve) => r1.question("", (ans) => {
    r1.close()
    resolve(ans)
  }))
}

async function connectToWhatsApp() {console.log(chalk.cyan(`
╔════════════════════════════════════════════╗
║               BASE BOT ESM 2025            ║
║               Created by Andzz             ║
║           https://github.com/Andzz         ║
╚════════════════════════════════════════════╝
`))

console.log(chalk.gray(`⚙ Versi     : `) + chalk.whiteBright(`1.1.0`))
console.log(chalk.gray(`⚙ Bahasa    : `) + chalk.whiteBright(`JavaScript (ESM)`))
console.log(chalk.gray(`⚙ Library   : `) + chalk.whiteBright(`@whiskeysockets/baileys`))
console.log(chalk.gray(`⚙ Lisensi   : `) + chalk.whiteBright(`MIT (c) 2025 Andzz`))


  const { state, saveCreds } = await useMultiFileAuthState(settings.sesiName)

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !usePairingCode,
    auth: state,
    browser: ["Ubuntu", "safari", "20.0.04"],
    version: [2, 3000, 1015901307]
  })

  if (usePairingCode && !sock.authState.creds.registered) {
    console.log(chalk.green("☘  Masukkan Nomor Dengan Awal 62"))
    const phoneNumber = await question("> ")
    const code = await sock.requestPairingCode(phoneNumber.trim())
    console.log(chalk.cyan(`🎁  Pairing Code : ${code}`))
  }

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", (update) => {
    const { connection } = update
    if (connection === "close") {
      console.log(chalk.red("❌  Koneksi Terputus, Mencoba Menyambung Ulang"))
      connectToWhatsApp()
    } else if (connection === "open") {
      console.log(chalk.green("✔  Bot Berhasil Terhubung Ke WhatsApp"))
    }
  })

  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0]
    if (!msg.message) return

    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
    const sender = msg.key.remoteJid
    const pushname = msg.pushName || settings.botName

    const listColor = ["red", "green", "yellow", "magenta", "cyan", "white", "blue"]
    const randomColor = listColor[Math.floor(Math.random() * listColor.length)]

    console.log(
      chalk.yellow.bold(settings.botName),
      chalk.green.bold("[ WhatsApp ]"),
      chalk[randomColor](pushname),
      chalk[randomColor](" : "),
      chalk.white(body)
    )

    handleCase(sock, m, settings)
  })

  sock.ev.on("connection.update", ({ connection }) => {
    if (connection === "open") {
      console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
      console.log(chalk.magentaBright("💡 Base Bot by Andzz - MIT License"))
      console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
    }
  })
}

connectToWhatsApp()
