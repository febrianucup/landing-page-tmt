# TMT Administration — Landing Page + Panel Konten

Landing page untuk **TMT (Teacher Management Tool)**, sistem administrasi sekolah untuk Guru,
Tata Usaha, dan Kepala Sekolah. Seluruh isi halaman dikelola dari dashboard CRUD bawaan
(`/dashboard`) — tanpa backend, data tersimpan di `localStorage` browser.

Dibuat dengan Vite + React 19, Tailwind CSS v4, React Router 7, dan AOS.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # bundle produksi ke dist/
npm run preview  # pratinjau hasil build
npm run lint     # oxlint
```

## Akun dashboard

```
email    : admin@tmt.id
kata sandi: admin123
```

Kredensial demo ada di `src/lib/demoAccount.js` — ganti sebelum dipublikasikan.

## Rute

| Rute | Isi |
| --- | --- |
| `/` | Landing page publik (hero, statistik, masalah vs solusi, peran, CTA, kontak, footer) |
| `/login` | Halaman masuk (tombol "Isi otomatis" mengisi akun demo) |
| `/dashboard` | Ringkasan konten: jumlah item, pesan terbaru, pintasan editor |
| `/dashboard/hero` | Judul, sorotan, deskripsi, poin keunggulan, tombol, gambar, ikon logo |
| `/dashboard/stats` | Kartu statistik (nilai, keterangan, ikon, warna, urutan) |
| `/dashboard/problems` | Pasangan "cara lama" vs "solusi TMT" |
| `/dashboard/roles` | Kartu peran beserta daftar fiturnya |
| `/dashboard/cta` | Panel ajakan bertindak dan gambar latarnya |
| `/dashboard/contact` | Kanal kontak + teks formulir + pengaturan EmailJS |
| `/dashboard/navigation` | Identitas brand, menu navbar, kolom dan tautan footer |
| `/dashboard/analytics` | Statistik web: kunjungan, pengunjung unik, per bagian, perangkat, aktivitas & sesi terbaru |
| `/dashboard/submissions` | Pesan masuk dari formulir kontak (baca, tandai, hapus, tambah) |
| `/dashboard/settings` | Ekspor/impor JSON, info penyimpanan, reset ke isi awal |

## Struktur

```
src/
  App.jsx                 provider + seluruh rute
  layouts/                LandingLayout (navbar+footer), DashboardLayout (sidebar+topbar)
  pages/                  Landing, Login, dan halaman-halaman dashboard
  sections/               bagian landing: Navbar, Hero, Stats, Problems, Roles, Cta, Contact, Footer
  ui/                     komponen dasar: Button, Field, Card, Modal, Repeater, IconPicker, …
  context/                ContentProvider (CRUD konten), AnalyticsProvider (kunjungan), AuthProvider (sesi login)
  hooks/                  useVisitTracking.js (catat kunjungan + bagian yang dilihat)
  lib/                    seed.js (isi awal), content.js (localStorage), analytics.js (kunjungan), tones.js, cn.js, …
  routes/RequireAuth.jsx  penjaga rute /dashboard
```

## Cara kerja penyimpanan konten

1. `src/lib/seed.js` mendefinisikan `DEFAULT_CONTENT` — seluruh isi halaman dan bentuk datanya.
2. `src/lib/content.js` memuat/menyimpan dokumen di `localStorage` (`tmt.content.v1`) dan
   menggabungkan dokumen tersimpan dengan default secara rekursif, sehingga field baru yang
   ditambahkan ke schema tidak merusak data lama.
3. `src/context/ContentProvider.jsx` menyediakan operasi berbasis path:

```js
const { content, setPath, addItem, updateItem, removeItem, moveItem } = useContent()

setPath(['hero', 'title'], 'Judul baru')
addItem(['stats', 'items'], { icon: 'bolt', value: '10x', label: 'Lebih cepat' })
updateItem(['stats', 'items'], id, { value: '12x' })
removeItem(['stats', 'items'], id)
moveItem(['stats', 'items'], id, -1)      // naikkan satu posisi
```

Setiap perubahan langsung disimpan (auto-save) dan langsung tampil di halaman publik —
tanpa build ulang. Indikator "Tersimpan" di topbar menampilkan waktu simpan terakhir.

### Menambah field baru

Tambahkan field di `DEFAULT_CONTENT`, lalu pakai di komponen section dan sediakan input-nya di
halaman dashboard terkait. Dokumen tersimpan akan otomatis terisi nilai default.

## Formulir kontak

Formulir di section `Contact` selalu menyimpan kiriman ke daftar `submissions` (muncul di
`/dashboard/submissions`). Pengiriman email lewat EmailJS bersifat opsional dan diatur di
`/dashboard/contact` (Service ID, Template ID, Public Key) — mati secara default.

## Statistik web (`/dashboard/analytics`)

Kunjungan landing page dicatat otomatis di browser (`tmt.analytics.v1`, terpisah dari dokumen
konten). Setiap kunjungan menyimpan jenis event, path, bagian, perujuk, perangkat, browser,
id pengunjung, dan id sesi:

| Jenis | Kapan dicatat |
| --- | --- |
| `view` | Setiap kali landing page dibuka (`useVisitTracking`) |
| `section` | Sekali per kunjungan saat sebuah `section[id]` masuk ke layar (IntersectionObserver) |
| `click` | Menu navbar dan tombol CTA di navbar diklik |
| `submit` | Formulir kontak berhasil dikirim |

- Sesi baru dihitung setelah 30 menit tanpa aktivitas; event yang sama dalam rentang singkat
  diabaikan (penjaga duplikat) dan maksimal 800 event terbaru disimpan.
- Halaman statistik menyediakan rentang Hari ini / 7 / 30 hari / Semua, grafik per hari,
  rincian per bagian–perangkat–halaman, ekspor CSV, hapus per baris, dan hapus semua.
- **Batas penting:** tanpa backend, yang tercatat hanya kunjungan dari browser ini — pengunjung
  lain tidak terlihat. Untuk data semua pengunjung perlu endpoint kolektor: kirim `event` dari
  `record()` di `src/context/AnalyticsProvider.jsx` sebagai `POST` JSON ke API-mu.
- Pencatatan bisa dihentikan sementara lewat field `recording: false` pada dokumen
  `tmt.analytics.v1` (tidak ada tombolnya di UI, supaya halaman tetap sederhana).

## Catatan teknis

- Animasi AOS diinisialisasi di `LandingLayout` saja; dashboard tidak memakai animasi.
- Gambar hero memakai `src/assets/mockup.png` selama field gambarnya dikosongkan; unggahan dari
  dashboard dikecilkan otomatis ke lebar maksimal 1600px sebelum disimpan ke `localStorage`.
- Batas `localStorage` sekitar 5 MB per origin — ekspor JSON secara berkala dari
  `/dashboard/settings` bila konten mulai banyak gambar.
- `lucide-react` masih terdaftar sebagai dependensi tetapi tidak lagi dipakai; bisa dihapus
  dengan `npm uninstall lucide-react`.
