# ProShop

Katalog produk dan backoffice inventaris untuk produsen bantal, guling, dan kasur. Pelanggan melihat harga/stok dan meneruskan pertanyaan melalui WhatsApp; aplikasi tidak memiliki cart, checkout, pembayaran, atau database order.

## Fitur

- Storefront SSR, pencarian/filter/sort/paginasi, detail produk, SEO, dan dialog order WhatsApp.
- Login admin berbasis cookie HttpOnly, session token ter-hash, rate limit login, dan API admin terproteksi.
- CRUD kategori dan produk (soft delete), upload langsung ke R2 via presigned URL, cover image.
- Mutasi stok masuk/keluar/penyesuaian yang dicatat bersama audit trail; stok tidak boleh negatif.
- Dashboard, laporan terfilter, dan export CSV ber-BOM untuk Excel.
- Jika env D1 kosong, halaman publik memakai data demo read-only agar desain dapat dilihat lokal. Admin tetap menolak login sampai D1 dikonfigurasi.

## Stack dan kebutuhan

Nuxt 4, Vue 3, TypeScript, Nitro, Pinia, Tailwind CSS 4, shadcn-nuxt/Reka UI, Headless UI, Cloudflare D1/R2, dan preset Vercel. Gunakan Node.js 20+ dan npm 10+.

## Instalasi lokal

```bash
npm install
cp .env.example .env
npm run dev
```

Buka `http://localhost:3000`. Sesuaikan nomor WhatsApp di `.env` sebelum menguji dialog order.

## Cloudflare D1

1. Buat database D1, misalnya `proshop-db`, dari Cloudflare Dashboard atau Wrangler.
2. Catat Account ID dan Database ID.
3. Buat API token dengan permission minimum untuk D1 database tersebut.
4. Isi tiga env `NUXT_CLOUDFLARE_*`.
5. Jalankan migration dan, opsional, data demo:

```bash
npx wrangler d1 execute proshop-db --remote --file=database/migrations/0001_initial.sql
npx wrangler d1 execute proshop-db --remote --file=database/seeds/development.sql
```

Seed hanya data demonstrasi; harga dan kontennya bukan data resmi dan harus diganti sebelum produksi.

## Membuat admin pertama

Pastikan env D1 tersedia pada shell, lalu:

```bash
npm run create-admin -- "Nama Admin" admin@domain-anda.id "password-kuat-minimal-10"
```

Password di-hash bcrypt (cost 12); tidak ada akun/password default.

## Cloudflare R2

1. Buat bucket `proshop-products` dan R2 API token yang hanya dapat mengelola bucket itu.
2. Isi Account ID, Access Key ID, Secret Access Key, dan nama bucket pada env private.
3. Aktifkan public/custom domain dan isi `NUXT_PUBLIC_R2_BASE_URL` tanpa slash akhir.
4. Atur CORS bucket agar origin lokal dan domain Vercel dapat melakukan `PUT` dengan header `Content-Type`; batasi origin ke domain aktual, jangan wildcard di produksi.
5. Upload dibatasi JPG/PNG/WebP, 5 MB, maksimal 6 file per produk, key acak, dan presigned URL 10 menit.

## Environment variables

Salin `.env.example`. Credential Cloudflare/R2 dan session hanya private. Set `NUXT_SESSION_SECRET` ke nilai acak panjang walaupun token session juga di-hash. Jangan commit `.env`.

Di Vercel, buka **Project → Settings → Environment Variables** dan masukkan seluruh variable untuk Production. Untuk Preview, sebaiknya gunakan D1/R2 terpisah agar pengujian tidak mengubah data produksi.

## Perintah

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

## GitHub dan Vercel

Setelah verifikasi:

```bash
git init
git add .
git commit -m "Initial ProShop production build"
git branch -M main
git remote add origin <GITHUB_REPOSITORY_URL>
git push -u origin main
```

Import repository di Vercel. Framework Nuxt terdeteksi otomatis dan `npm run build` menghasilkan output preset Vercel. Push berikutnya ke `main` memicu production deployment.

## Checklist produksi

- Migration dan admin pertama sudah dibuat; seed demo ditinjau/dihapus.
- Nomor WhatsApp, site URL, public R2 URL, dan semua setting bisnis benar.
- Semua secret hanya berada di Vercel/Cloudflare, bukan Git.
- CORS R2 terbatas pada localhost (development) dan domain Vercel/custom domain.
- Preview memakai database terpisah atau tidak dipakai untuk tes destruktif.
- Jalankan lint, typecheck, test, dan build sebelum push.

## Troubleshooting

- **Public menampilkan demo:** credential D1 belum lengkap atau server perlu direstart setelah `.env` berubah.
- **Admin menolak login:** migration/admin belum dibuat atau D1 token tidak punya izin query.
- **Upload gagal:** periksa env R2, public base URL, CORS, ukuran/MIME file, dan jam komputer.
- **D1 502:** cek Account ID, Database ID, API token, serta log server (secret tidak dicetak).
- **Gambar tidak tampil:** pastikan custom/public R2 domain aktif dan object dapat dibaca publik.
