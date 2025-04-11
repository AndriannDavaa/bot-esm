# 🤖 BASE BOT WHATSAPP ESM TANPA BUTTON

Bot WhatsApp sederhana berbasis ESM JavaScript, **tidak menggunakan tombol interaktif**, cocok untuk pemula maupun pengembang yang ingin sistem ringan dan mudah dikembangkan.

---

## ✨ Fitur Utama

- Login menggunakan **Pairing Code**
- Tidak menggunakan tombol (tanpa button)
- Struktur modular dan mudah dikembangkan
- Semua pengaturan diatur melalui `settings.js`
- Mendukung balasan pesan, sticker, dan downloader
- Tidak butuh database, cukup pakai JSON

---

## ⚙️ Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/AndriannDavaa/bot-esm.git
cd bot-esm
```

### 2. Install Dependency

```bash
npm install
```

### 3. Jalankan Bot

```bash
npm start
```

> **Note**: Pastikan kamu sudah login dengan Pairing Code saat pertama kali menjalankan bot.

---

## ⚒️ Struktur File

```bash
bot-esm/
├── main.js             # File utama bot
├── menu.js             # Menangani semua perintah
├── settings.js         # Konfigurasi bot
├── package.json        # Info dan dependensi
├── sessions/           # Menyimpan sesi login WhatsApp
└── lib/                # Berisi library tambahan (misal: time.js)
```

---

## © Credit

- Dibuat oleh **Andzz**
- GitHub: [github.com/AndriannDavaa](https://github.com/AndriannDavaa)
- Lisensi: MIT License
