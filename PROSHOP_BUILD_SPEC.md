# PROSHOP — Production Build Specification

> **Target:** coding agent / Codex di VS Code  
> **Project:** ProShop — katalog produksi bantal, guling, dan kasur  
> **Deployment utama:** GitHub → Vercel  
> **Database:** Cloudflare D1  
> **Image storage:** Cloudflare R2  
> **Bahasa UI:** Indonesia  
> **Style:** luxury white & gold, modern, editorial, clean, production-grade  
> **Important:** website publik adalah katalog bergaya POS/product browser, **BUKAN e-commerce dengan keranjang**. Semua order diarahkan ke WhatsApp.

---

# 0. INSTRUKSI UTAMA UNTUK CODING AGENT

Kamu adalah coding agent yang bertanggung jawab membangun project ini sampai dapat dijalankan dan siap di-push ke GitHub lalu di-import ke Vercel.

## Cara bekerja

1. Baca seluruh dokumen ini sebelum membuat perubahan.
2. Jika repository masih kosong, inisialisasi project dari awal.
3. Jika repository sudah memiliki kode, audit struktur terlebih dahulu dan pertahankan bagian yang masih relevan.
4. Jangan berhenti hanya karena satu package bermasalah. Cari alternatif yang paling kompatibel dengan stack ini tanpa mengubah tujuan produk.
5. Jangan membuat tampilan generik hasil template AI.
6. Jangan membuat copywriting berlebihan, gradient norak, glassmorphism berlebihan, orb/blob dekoratif, atau layout SaaS generik.
7. Prioritaskan:
   - maintainability,
   - keamanan,
   - performa,
   - aksesibilitas,
   - mobile responsiveness,
   - UX admin yang cepat.
8. Semua fitur inti harus benar-benar bekerja, bukan sekadar mockup.
9. Jangan menambahkan keranjang, checkout, payment gateway, akun customer, atau order database.
10. Order customer hanya melalui WhatsApp.
11. Setelah implementasi:
    - jalankan lint,
    - typecheck,
    - build production,
    - perbaiki error,
    - pastikan tidak ada secret di Git.
12. Buat README final yang menjelaskan setup Cloudflare, env, migration, Vercel, dan workflow Git.

---

# 1. TUJUAN PRODUK

Bangun web **ProShop**, usaha produksi:

- Bantal
- Guling
- Kasur
- Produk tidur / bedding terkait jika nanti ditambahkan admin

Website mempunyai dua area besar:

## Public storefront

Tampilan utama seperti katalog POS modern:

- cepat melihat banyak produk,
- ada pencarian,
- ada filter kategori,
- ada stock indicator,
- ada harga,
- bisa membuka detail produk,
- tombol order langsung melalui WhatsApp.

**Tidak ada cart.**

## Admin backoffice

Admin dapat:

- login,
- CRUD kategori,
- CRUD produk,
- upload / hapus / atur foto produk,
- ubah harga,
- ubah deskripsi,
- mengatur stok,
- mencatat barang masuk,
- mencatat barang keluar,
- melakukan penyesuaian stok,
- melihat laporan mutasi stok,
- filter laporan,
- export CSV,
- melihat stok menipis,
- melihat ringkasan dashboard.

---

# 2. STACK WAJIB

Gunakan stack berikut.

## Core

- **Nuxt 4**
- **Vue 3**
- **TypeScript**
- **Nitro server routes**
- **Pinia**
- **Tailwind CSS 4**
- **shadcn-vue**
- **Reka UI**
- **Headless UI for Vue**
- **core-js** bila diperlukan untuk compatibility / polyfill
- **Vercel**

### Catatan Radix UI

Jangan memasang package React `@radix-ui/*`.

Untuk Nuxt/Vue gunakan:

- `shadcn-vue`
- `reka-ui`

Reka UI adalah penerus ekosistem Radix Vue dan merupakan primitive yang sesuai untuk Vue.

Gunakan Headless UI hanya pada bagian yang benar-benar dibutuhkan, misalnya transition tertentu. Jangan membuat dua implementasi modal/dropdown berbeda untuk fungsi yang sama.

## Supporting packages

Direkomendasikan:

- `@pinia/nuxt`
- `@vueuse/nuxt`
- `@nuxt/image`
- `shadcn-nuxt`
- `reka-ui`
- `@headlessui/vue`
- `lucide-vue-next`
- `zod`
- `vee-validate`
- `@vee-validate/zod`
- `date-fns`
- `nanoid`
- `bcryptjs`
- `@aws-sdk/client-s3`
- `@aws-sdk/s3-request-presigner`
- `tailwindcss`
- `@tailwindcss/vite`
- `core-js`

Gunakan npm kecuali repository sudah jelas menggunakan package manager lain.

---

# 3. ARSITEKTUR DEPLOYMENT

```text
Browser
   |
   v
Vercel
Nuxt 4 / Nitro
   |
   +----------------------------+
   |                            |
   v                            v
Cloudflare D1              Cloudflare R2
REST API                   S3-compatible API
database                   product images
```

## Kenapa arsitektur ini

Aplikasi Nuxt tetap di-deploy ke Vercel sesuai workflow yang diinginkan.

Karena aplikasi tidak berjalan sebagai Cloudflare Worker, jangan memakai D1 binding langsung di runtime Vercel.

Gunakan **Cloudflare D1 HTTP REST API dari server-side Nitro saja**.

Secret Cloudflare:

- tidak boleh pernah dikirim ke browser,
- tidak boleh berada di `runtimeConfig.public`,
- tidak boleh di-commit.

Cloudflare R2 digunakan untuk foto upload dari admin.

---

# 4. WORKFLOW GIT DAN VERCEL

Project harus cocok dengan alur berikut:

```bash
git init
git add .
git commit -m "Initial ProShop production build"
git branch -M main
git remote add origin <GITHUB_REPOSITORY_URL>
git push -u origin main
```

Lalu:

1. Login Vercel.
2. Import GitHub repository.
3. Pilih repository ProShop.
4. Vercel harus mengenali Nuxt.
5. Masukkan environment variables.
6. Deploy.
7. Push berikutnya ke `main` harus memicu production deployment.
8. Branch lain dapat menghasilkan preview deployment.

Jangan buat setup deployment yang mengharuskan server VPS sendiri.

---

# 5. IDENTITAS VISUAL

## Brand

Nama:

**ProShop**

Descriptor:

**Produsen Bantal, Guling & Kasur**

Brand impression:

- bersih,
- premium,
- profesional,
- hangat,
- terpercaya,
- craftsmanship,
- bukan marketplace murah,
- bukan website hotel,
- bukan template AI.

## Warna

Gunakan design token, jangan hardcode warna berulang.

```css
--background: #FFFFFF;
--surface: #FBFAF7;
--surface-2: #F6F3EC;

--foreground: #171717;
--muted-foreground: #6F6B63;

--gold: #B28A45;
--gold-dark: #8C672D;
--gold-soft: #E7D7B7;
--gold-pale: #F5EEDF;

--border: #E8E3D8;
--border-strong: #D8CEBA;

--success: #247A52;
--warning: #A36716;
--danger: #B54242;
```

Gold hanya sebagai:

- accent,
- border detail,
- icon,
- active state,
- CTA tertentu,
- underline,
- angka penting.

Jangan membuat seluruh halaman berwarna emas.

## Typography

Gunakan kombinasi yang terasa editorial dan premium.

Rekomendasi:

- body/UI: **Manrope** atau **Inter**
- display/headline: **Cormorant Garamond** secara terbatas

Atau gunakan satu sans-serif premium bila ingin lebih modern.

Jangan membuat semua teks menggunakan serif.

## Radius

- cards: `14px–18px`
- buttons: `10px–12px`
- input: `10px–12px`
- pill/chip: full rounded jika memang chip

Hindari semua elemen terlalu bulat.

## Shadow

Sangat halus.

Gunakan shadow hanya untuk:

- floating dropdown,
- modal,
- sticky mobile CTA,
- card hover bila diperlukan.

Card normal lebih baik mengandalkan border + white space.

---

# 6. ATURAN "JANGAN AI SLOP"

DILARANG:

- hero dengan gradient ungu/biru,
- glowing orb,
- random blobs,
- bento grid hanya karena sedang tren,
- terlalu banyak card dengan ikon,
- heading seperti “Transform Your Sleep Experience” tanpa konteks,
- efek glassmorphism berat,
- marquee logo palsu,
- fake customer logo,
- fake statistic seperti “10K+ happy customers” jika datanya tidak ada,
- testimonial palsu,
- badge “AI powered”,
- stock photo manusia tidur yang terlalu generik,
- terlalu banyak animasi,
- scroll hijacking,
- cursor custom,
- pseudo-3D berlebihan.

WAJIB:

- penggunaan whitespace yang matang,
- hierarchy tipografi jelas,
- image crop konsisten,
- grid presisi,
- visual density admin berbeda dari landing page,
- focus state jelas,
- hover halus,
- responsive serius,
- copywriting singkat dan konkret.

---

# 7. PUBLIC ROUTES

Gunakan route berikut:

```text
/
├── /produk
├── /produk/[slug]
├── /tentang
├── /kontak
└── /admin
    ├── /login
    ├── /dashboard
    ├── /produk
    ├── /produk/tambah
    ├── /produk/[id]/edit
    ├── /kategori
    ├── /stok
    ├── /stok/masuk
    ├── /stok/keluar
    ├── /laporan
    └── /pengaturan
```

`/admin` redirect sesuai auth:

- belum login → `/admin/login`
- sudah login → `/admin/dashboard`

---

# 8. LANDING PAGE `/`

Landing page tetap terasa seperti katalog produk, bukan company profile yang penuh section dekoratif.

## 8.1 Header

Desktop:

- logo ProShop kiri,
- menu:
  - Beranda
  - Produk
  - Tentang
  - Kontak
- field search produk compact,
- CTA kanan: `Hubungi WhatsApp`

Mobile:

- logo,
- search icon,
- menu button,
- off-canvas navigation.

Header:

- sticky,
- putih sedikit transparan bila ingin,
- border-bottom tipis,
- blur sangat ringan,
- tinggi sekitar 72–80px desktop.

## 8.2 Hero

Layout editorial 2 kolom.

Kiri:

Eyebrow:
`PRODUK TIDUR BUATAN LOKAL`

Headline contoh:

> Tidur lebih nyaman dimulai dari produk yang dibuat dengan benar.

Description:

> Bantal, guling, dan kasur produksi ProShop dengan pilihan ukuran, material, dan stok yang dapat langsung dikonsultasikan melalui WhatsApp.

CTA:

- `Lihat Produk`
- secondary `Konsultasi WhatsApp`

Micro info:

- Produksi langsung
- Stok terpantau
- Bisa konsultasi kebutuhan

Kanan:

- foto bedding premium,
- crop natural,
- jangan beri overlay gradient berat,
- satu small floating label maksimal:
  `Produksi ProShop`

## 8.3 Product explorer

Ini adalah area utama.

Desktop:

```text
+-----------------------------------------------------------+
| H2 Produk ProShop                         Sort / Search    |
+-------------------+---------------------------------------+
| Category sidebar  | Product grid                          |
|                   |                                       |
| Semua             | [product] [product] [product]        |
| Bantal            | [product] [product] [product]        |
| Guling            |                                       |
| Kasur             |                                       |
|                   |                                       |
+-------------------+---------------------------------------+
```

Mobile:

- horizontal category chips,
- search,
- sort dropdown,
- 2-column grid jika layar cukup,
- 1-column pada layar sempit.

Kategori tidak dibuat sebagai oversized icon card.

## 8.4 Product card

Setiap card:

- image ratio sekitar 4:3 atau 1:1 sesuai asset,
- category kecil,
- nama produk,
- SKU kecil,
- harga IDR,
- stock badge,
- tombol `Pesan via WhatsApp`,
- optional small text `Lihat detail`.

Contoh:

```text
[Bantal Hotel Premium Image]

BANTAL
Bantal Hotel Premium 900gr
PS-BTL-001

Rp89.000

● Stok 26

[Pesan via WhatsApp]
```

Jika stok = 0:

- badge `Stok habis`,
- CTA tetap dapat menjadi `Tanya ketersediaan`,
- jangan menampilkan seolah produk dapat dibeli langsung.

## 8.5 Value section

Bukan 6 card generik.

Gunakan layout horizontal elegan dengan 3 value:

- Produksi terkontrol
- Pilihan ukuran & material
- Pemesanan langsung via WhatsApp

## 8.6 Featured manufacturing / brand story

Section sederhana:

- foto material / bedding,
- headline,
- 2–3 paragraph singkat tentang fokus kualitas produksi.

Jangan membuat klaim sertifikasi jika tidak ada data.

## 8.7 CTA WhatsApp

Section kontras menggunakan surface ivory, bukan gradient.

Headline:

`Butuh ukuran atau jumlah tertentu?`

Copy:

`Hubungi ProShop untuk kebutuhan rumah, penginapan, kos, reseller, atau pemesanan dalam jumlah banyak.`

Button:
`Chat ProShop di WhatsApp`

## 8.8 Footer

Kolom:

- brand
- navigasi
- kontak
- jam layanan jika nanti diisi
- copyright

Tambahkan link ke WhatsApp.

---

# 9. HALAMAN `/produk`

Halaman katalog penuh.

Fitur:

- search debounced,
- kategori,
- status stok:
  - Semua
  - Tersedia
  - Stok menipis
- sorting:
  - Terbaru
  - Nama A-Z
  - Harga termurah
  - Harga tertinggi
- pagination atau load-more.

Untuk produk puluhan/ratusan, jangan memuat semuanya sekaligus.

Query string harus mencerminkan filter:

```text
/produk?q=bantal&category=bantal&stock=available&sort=price_asc&page=2
```

State filter dapat menggunakan Pinia dan disinkronkan dengan URL.

---

# 10. HALAMAN DETAIL PRODUK

Route:

```text
/produk/[slug]
```

Isi:

- breadcrumb,
- gallery,
- thumbnail image,
- product name,
- category,
- SKU,
- price,
- stock,
- description,
- specification list,
- CTA WhatsApp,
- related products.

## Detail information

Contoh:

```text
Ukuran        45 × 65 cm
Isi           Microfiber
Berat         ± 900 gram
Cover         Cotton blend
Produksi      ProShop
```

Specifications disimpan sebagai JSON string atau field structured sesuai schema yang dijelaskan nanti.

CTA order fixed/sticky pada mobile bila berguna.

Tidak ada quantity cart.

Boleh ada quantity selector **hanya untuk membentuk pesan WhatsApp**.

Tidak boleh ada keranjang persisten.

---

# 11. FLOW ORDER VIA WHATSAPP

Ketika user menekan `Pesan via WhatsApp`, buka small order dialog / sheet.

Fields:

- Produk — read only
- Jumlah — default 1
- Nama — optional
- Catatan — optional

Button:

`Lanjut ke WhatsApp`

Generate text:

```text
Halo ProShop, saya ingin menanyakan produk berikut:

Produk: Bantal Hotel Premium 900gr
Kode: PS-BTL-001
Harga: Rp89.000
Jumlah: 2
Nama: Fira
Catatan: Apakah tersedia warna putih?

Mohon informasi ketersediaan dan detail pemesanannya. Terima kasih.
```

Encode dengan `encodeURIComponent`.

URL:

```text
https://wa.me/<WHATSAPP_E164>?text=<ENCODED_MESSAGE>
```

Nomor WhatsApp harus berasal dari settings database atau runtime config fallback.

## Tracking click

Sebelum membuka WhatsApp:

POST:

```text
/api/public/whatsapp-click
```

Payload minimal:

```json
{
  "productId": "..."
}
```

Jangan menyimpan isi pesan customer.

Jangan menyimpan data pribadi dari form tracking.

Tracking digunakan hanya untuk dashboard jumlah klik WhatsApp.

---

# 12. ADMIN LOGIN

Route:

```text
/admin/login
```

Design:

- clean,
- tidak memakai layout public storefront,
- brand kecil,
- email,
- password,
- show/hide password,
- button `Masuk`,
- error state jelas.

Tidak ada self-registration.

Admin hanya dibuat lewat script / migration manual.

## Security

Password:

- hash dengan `bcryptjs`,
- minimum 10 karakter untuk admin baru.

Session:

- secure random session token,
- hanya token raw di cookie,
- yang disimpan di DB adalah hash token.

Cookie:

- `HttpOnly`
- `Secure` di production
- `SameSite=Lax`
- path `/`
- max age sesuai session expiry.

Session default:

7 hari.

Tidak boleh menyimpan login admin di `localStorage`.

---

# 13. ADMIN LAYOUT

Desktop:

```text
+----------------------+--------------------------------------+
| ProShop Admin        | Topbar                               |
|                      |                                      |
| Dashboard            | Main content                         |
| Produk               |                                      |
| Kategori             |                                      |
| Stok                 |                                      |
| Laporan              |                                      |
| Pengaturan           |                                      |
|                      |                                      |
| Keluar               |                                      |
+----------------------+--------------------------------------+
```

Sidebar:

- width sekitar 240–260px,
- icon kecil dari Lucide,
- active state gold,
- tidak memakai gradient.

Mobile:

- topbar + drawer sidebar.

Admin lebih padat daripada public UI.

---

# 14. ADMIN DASHBOARD

Route:

```text
/admin/dashboard
```

## Metric cards

Tampilkan maksimal 4 metric utama:

1. Total produk aktif
2. Total unit stok
3. Produk stok menipis
4. Klik WhatsApp bulan ini

Tambahan section:

### Stok menipis

Table:

- produk,
- SKU,
- stock,
- minimum,
- status,
- action.

### Aktivitas stok terbaru

Table:

- waktu,
- produk,
- tipe,
- qty,
- sebelum,
- sesudah,
- admin.

### Quick action

Buttons:

- Tambah Produk
- Barang Masuk
- Barang Keluar
- Lihat Laporan

Jangan membuat chart jika data belum benar-benar bermanfaat.

Jika chart dibuat, cukup satu chart mutasi stok 30 hari.

---

# 15. ADMIN PRODUK

Route:

```text
/admin/produk
```

Gunakan data table.

Kolom:

- Foto
- SKU
- Nama
- Kategori
- Harga
- Stok
- Status
- Updated
- Actions

Features:

- search,
- filter category,
- filter active/inactive,
- filter low stock,
- pagination,
- sort,
- responsive.

Actions:

- detail,
- edit,
- nonaktifkan,
- hapus soft-delete.

Hapus jangan langsung hard delete karena histori stok harus tetap aman.

---

# 16. FORM TAMBAH / EDIT PRODUK

Fields:

## Informasi dasar

- Nama produk *
- Slug *
- SKU *
- Kategori *
- Harga jual *
- Deskripsi pendek
- Deskripsi lengkap
- Status aktif
- Featured

## Stok

Pada create:

- stok awal
- low stock threshold

Pada edit:

- tampilkan stok saat ini,
- perubahan stok tidak boleh hanya overwrite diam-diam.

Jika admin ingin mengubah stok dari 20 menjadi 18:

- sistem membuat movement `ADJUSTMENT_OUT` qty 2.

Jika 20 menjadi 25:

- sistem membuat movement `ADJUSTMENT_IN` qty 5.

Dengan demikian laporan tetap konsisten.

## Specification

UI key-value repeater:

```text
Ukuran       | 45 × 65 cm
Isi          | Microfiber
Berat        | ± 900 gram
Cover        | Cotton blend
```

Simpan sebagai JSON.

## Foto

Support:

- multiple image,
- maksimal misalnya 6 gambar / produk,
- drag reorder jika mudah,
- set cover image,
- delete,
- preview,
- JPG,
- PNG,
- WebP,
- maksimal 5 MB,
- validate MIME,
- generate safe unique filename.

Image upload ke R2.

---

# 17. CATEGORY ADMIN

Route:

```text
/admin/kategori
```

Fields:

- nama,
- slug,
- description optional,
- sort_order,
- status aktif.

Default seed:

- Bantal
- Guling
- Kasur

Kategori dengan produk aktif tidak boleh hard delete sembarangan.

Boleh:

- nonaktifkan,
- soft delete jika tidak dipakai.

---

# 18. INVENTORY / STOK

## `/admin/stok`

Tampilkan overview:

- search product,
- category filter,
- stock,
- threshold,
- status.

Status:

```text
Aman
Menipis
Habis
```

Action:

- Barang Masuk
- Barang Keluar
- Penyesuaian

---

# 19. BARANG MASUK

Route:

```text
/admin/stok/masuk
```

Fields:

- produk *
- qty *
- tanggal/waktu — default sekarang
- referensi — optional
- supplier / sumber — optional text
- catatan — optional

Submit harus menghasilkan movement:

```text
type = IN
quantity = positif
before_stock = stok sebelumnya
after_stock = before + quantity
```

---

# 20. BARANG KELUAR

Route:

```text
/admin/stok/keluar
```

Fields:

- produk *
- qty *
- tanggal/waktu
- referensi
- tujuan / keterangan optional
- catatan

Validation:

```text
qty <= stok saat ini
```

Jika qty melebihi stok:

- server reject,
- UI tampilkan error,
- stock tidak boleh negatif.

Movement:

```text
type = OUT
before_stock = stock
after_stock = stock - qty
```

---

# 21. LAPORAN BARANG MASUK & KELUAR

Route:

```text
/admin/laporan
```

Filter:

- tanggal awal,
- tanggal akhir,
- product,
- category,
- movement type,
- keyword reference.

Summary:

- total barang masuk,
- total barang keluar,
- jumlah transaksi mutasi.

Table:

- tanggal,
- nomor/referensi,
- produk,
- SKU,
- kategori,
- tipe,
- qty,
- stock sebelum,
- stock sesudah,
- catatan,
- admin.

Pagination server-side.

## Export CSV

Button:

`Export CSV`

Export harus mengikuti filter yang sedang aktif.

Filename:

```text
proshop-laporan-stok-2026-08-01_2026-08-31.csv
```

Gunakan UTF-8 BOM bila diperlukan agar nyaman dibuka di Excel Indonesia.

Tidak perlu PDF pada versi awal.

---

# 22. PENGATURAN ADMIN

Route:

```text
/admin/pengaturan
```

Fields:

## Store

- nama bisnis
- tagline
- WhatsApp
- alamat
- email
- jam layanan

## Homepage

- hero eyebrow
- hero title
- hero description
- CTA label

## Inventory

- default low stock threshold

Jangan membuat full CMS.

Cukup settings yang benar-benar berguna.

---

# 23. DATABASE SCHEMA — CLOUDFLARE D1

Buat folder:

```text
database/
└── migrations/
    └── 0001_initial.sql
```

Gunakan SQLite-compatible SQL.

## Suggested schema

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE admin_users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE admin_sessions (
  id TEXT PRIMARY KEY,
  admin_user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (admin_user_id) REFERENCES admin_users(id)
);

CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  deleted_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  category_id TEXT,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  description TEXT,
  price INTEGER NOT NULL DEFAULT 0 CHECK (price >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  low_stock_threshold INTEGER NOT NULL DEFAULT 5 CHECK (low_stock_threshold >= 0),
  specifications_json TEXT NOT NULL DEFAULT '{}',
  is_featured INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  deleted_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_images (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  storage_key TEXT,
  source TEXT NOT NULL DEFAULT 'r2',
  alt_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_cover INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE inventory_movements (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  movement_type TEXT NOT NULL CHECK (
    movement_type IN ('IN', 'OUT', 'ADJUSTMENT_IN', 'ADJUSTMENT_OUT')
  ),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  before_stock INTEGER NOT NULL CHECK (before_stock >= 0),
  after_stock INTEGER NOT NULL CHECK (after_stock >= 0),
  reference TEXT,
  counterparty TEXT,
  note TEXT,
  movement_at TEXT NOT NULL DEFAULT (datetime('now')),
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (created_by) REFERENCES admin_users(id)
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE whatsapp_click_events (
  id TEXT PRIMARY KEY,
  product_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  admin_user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (admin_user_id) REFERENCES admin_users(id)
);

CREATE INDEX idx_products_category_id
ON products(category_id);

CREATE INDEX idx_products_active_deleted
ON products(is_active, deleted_at);

CREATE INDEX idx_products_stock
ON products(stock);

CREATE INDEX idx_inventory_product_date
ON inventory_movements(product_id, movement_at DESC);

CREATE INDEX idx_inventory_type_date
ON inventory_movements(movement_type, movement_at DESC);

CREATE INDEX idx_whatsapp_created_at
ON whatsapp_click_events(created_at DESC);
```

## Price format

Simpan harga IDR sebagai integer.

Benar:

```text
89000
```

Jangan:

```text
89000.00
```

Formatter:

```ts
new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})
```

---

# 24. ATOMIC STOCK LOGIC

Stok adalah data sensitif.

Jangan melakukan:

```text
GET stock
client menghitung
PUT stock baru
```

tanpa perlindungan.

Mutasi stock dan insert movement harus dilakukan di server dalam satu batch database.

Untuk OUT:

- validasi stock cukup,
- insert movement,
- update stock,
- jika salah satu gagal rollback batch.

Gunakan parameter binding.

Jangan membangun SQL dengan string interpolation dari input user.

---

# 25. D1 SERVER CLIENT

Buat:

```text
server/utils/d1.ts
```

Tugas:

- akses Cloudflare D1 REST API,
- server-only,
- method:
  - `query`
  - `first`
  - `execute`
  - `batch`
- normalize error,
- timeout,
- log aman tanpa token.

Endpoint Cloudflare:

```text
POST https://api.cloudflare.com/client/v4/accounts/{accountId}/d1/database/{databaseId}/query
```

Headers:

```text
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

Semua credential dari private `runtimeConfig`.

---

# 26. CLOUDFLARE R2

Bucket contoh:

```text
proshop-products
```

Gunakan S3-compatible endpoint.

Implement:

```text
server/utils/r2.ts
```

## Upload flow

Recommended:

1. Admin memilih file.
2. Frontend POST ke `/api/admin/uploads/presign`.
3. Server:
   - cek session,
   - cek filename/MIME/size,
   - generate random object key,
   - generate presigned PUT.
4. Browser upload langsung ke R2.
5. Frontend menerima success.
6. Product save menyimpan `storage_key` dan public image URL.

Presigned URL expiry pendek:

```text
5–10 menit
```

Jangan expose R2 Secret Access Key.

## Object key

Contoh:

```text
products/01JABC.../20260825-uuid.webp
```

Jangan memakai filename user sebagai key utama.

## Public image URL

Gunakan custom domain R2 atau public base URL dari env:

```text
https://cdn.proshop.example/products/...
```

Fallback development dapat memakai URL public R2 yang dikonfigurasi owner.

---

# 27. ENVIRONMENT VARIABLES

Buat `.env.example`.

```dotenv
# App
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_WHATSAPP_NUMBER=6281234567890

# Cloudflare D1 - SERVER ONLY
NUXT_CLOUDFLARE_ACCOUNT_ID=
NUXT_CLOUDFLARE_D1_DATABASE_ID=
NUXT_CLOUDFLARE_API_TOKEN=

# Cloudflare R2 - SERVER ONLY
NUXT_R2_ACCOUNT_ID=
NUXT_R2_ACCESS_KEY_ID=
NUXT_R2_SECRET_ACCESS_KEY=
NUXT_R2_BUCKET=proshop-products

# R2 read/public
NUXT_PUBLIC_R2_BASE_URL=

# Session
NUXT_SESSION_COOKIE_NAME=proshop_admin_session
NUXT_SESSION_SECRET=
```

`.env` wajib ada di `.gitignore`.

Jangan memakai placeholder secret lemah di production.

---

# 28. NUXT RUNTIME CONFIG

Contoh struktur:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    cloudflare: {
      accountId: '',
      d1DatabaseId: '',
      apiToken: '',
    },

    r2: {
      accountId: '',
      accessKeyId: '',
      secretAccessKey: '',
      bucket: '',
    },

    session: {
      cookieName: 'proshop_admin_session',
      secret: '',
    },

    public: {
      siteUrl: '',
      whatsappNumber: '',
      r2BaseUrl: '',
    },
  },
})
```

---

# 29. API STRUCTURE

Gunakan Nitro server routes.

```text
server/
├── api/
│   ├── public/
│   │   ├── products.get.ts
│   │   ├── products/
│   │   │   └── [slug].get.ts
│   │   ├── categories.get.ts
│   │   ├── settings.get.ts
│   │   └── whatsapp-click.post.ts
│   │
│   ├── auth/
│   │   ├── login.post.ts
│   │   ├── logout.post.ts
│   │   └── me.get.ts
│   │
│   └── admin/
│       ├── dashboard.get.ts
│       ├── products/
│       │   ├── index.get.ts
│       │   ├── index.post.ts
│       │   ├── [id].get.ts
│       │   ├── [id].put.ts
│       │   └── [id].delete.ts
│       ├── categories/
│       ├── inventory/
│       │   ├── overview.get.ts
│       │   ├── in.post.ts
│       │   ├── out.post.ts
│       │   └── adjustment.post.ts
│       ├── reports/
│       │   ├── inventory.get.ts
│       │   └── inventory.csv.get.ts
│       ├── settings/
│       └── uploads/
│           ├── presign.post.ts
│           └── object.delete.ts
│
├── middleware/
│   └── require-admin.ts
│
└── utils/
    ├── auth.ts
    ├── d1.ts
    ├── r2.ts
    ├── id.ts
    ├── validation.ts
    └── audit.ts
```

---

# 30. RESPONSE SHAPE

Gunakan konsistensi.

Success:

```json
{
  "data": {},
  "meta": {}
}
```

Error:

```json
{
  "statusCode": 422,
  "statusMessage": "Validation Error",
  "data": {
    "fieldErrors": {
      "price": ["Harga wajib lebih dari atau sama dengan 0."]
    }
  }
}
```

Jangan expose raw SQL error ke client.

---

# 31. VALIDATION

Semua mutation divalidasi **server-side** dengan Zod.

Frontend boleh memakai schema sama jika memungkinkan.

Contoh product:

```ts
const ProductSchema = z.object({
  name: z.string().trim().min(2).max(120),
  sku: z.string().trim().min(2).max(50),
  slug: z.string().trim().min(2).max(140),
  categoryId: z.string().min(1),
  price: z.number().int().min(0),
  lowStockThreshold: z.number().int().min(0),
  shortDescription: z.string().max(220).optional(),
  description: z.string().max(5000).optional(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
})
```

Slug:

- lowercase,
- hyphen,
- no unsafe characters.

SKU:

- unique,
- uppercase UI suggestion,
- backend tetap validasi uniqueness.

---

# 32. PINIA

Pinia dipakai untuk client state yang memang perlu persisten selama navigasi.

Stores:

```text
stores/
├── catalog.ts
├── ui.ts
└── admin.ts
```

## `catalog.ts`

State:

- query
- category
- stockFilter
- sort
- current page

Jangan jadikan Pinia sebagai pengganti server database.

Gunakan `useAsyncData` / `$fetch` untuk data backend.

## `ui.ts`

- mobile nav
- product quick order dialog
- admin sidebar state

## `admin.ts`

- current admin profile
- lightweight shared admin state

Jangan simpan session token di store.

---

# 33. COMPONENT STRUCTURE

```text
app/
├── components/
│   ├── brand/
│   │   ├── BrandLogo.vue
│   │   └── GoldDivider.vue
│   │
│   ├── layout/
│   │   ├── PublicHeader.vue
│   │   ├── PublicFooter.vue
│   │   ├── AdminSidebar.vue
│   │   └── AdminTopbar.vue
│   │
│   ├── product/
│   │   ├── ProductCard.vue
│   │   ├── ProductGrid.vue
│   │   ├── ProductGallery.vue
│   │   ├── ProductPrice.vue
│   │   ├── ProductStockBadge.vue
│   │   ├── ProductFilters.vue
│   │   └── WhatsAppOrderDialog.vue
│   │
│   ├── inventory/
│   │   ├── StockStatusBadge.vue
│   │   ├── StockMovementForm.vue
│   │   └── StockMovementTable.vue
│   │
│   ├── admin/
│   │   ├── AdminPageHeader.vue
│   │   ├── MetricCard.vue
│   │   ├── DataTable.vue
│   │   ├── ProductForm.vue
│   │   ├── ProductImageUploader.vue
│   │   └── EmptyState.vue
│   │
│   └── ui/
│       └── shadcn generated components
│
├── layouts/
│   ├── default.vue
│   └── admin.vue
│
└── pages/
```

Jangan menaruh seluruh halaman ke satu komponen raksasa.

---

# 34. SHADCN / REKA COMPONENTS

Gunakan komponen yang relevan:

- Button
- Input
- Textarea
- Select
- Dialog
- Sheet
- DropdownMenu
- AlertDialog
- Badge
- Table
- Tabs bila perlu
- Skeleton
- Tooltip
- Popover
- Calendar/date picker jika stabil
- Command untuk searchable product select bila perlu

Jangan gunakan Card untuk semuanya.

Banyak layout sebaiknya hanya `<div>` dengan spacing dan border yang baik.

---

# 35. HEADLESS UI

Gunakan `@headlessui/vue` secara terbatas.

Contoh penggunaan valid:

- transition custom untuk image preview / nav element.

Jangan membuat dialog Headless UI jika shadcn/Reka dialog sudah digunakan pada area tersebut.

Tujuannya bukan memenuhi checklist package tetapi menjaga stack tetap konsisten.

---

# 36. ICON

Gunakan `lucide-vue-next`.

Dilarang:

- emoji sebagai primary icon admin,
- campur 3 icon library,
- giant illustrative icons.

Icon stroke:

- 18–20px normal,
- konsisten.

---

# 37. FREE ONLINE IMAGES UNTUK DEMO

Karena produk final nantinya diupload admin, public demo boleh memakai foto gratis yang relevan.

Gunakan hanya sumber dengan lisensi penggunaan yang jelas seperti:

- Unsplash
- Pexels

Jangan memakai:

- image Google random,
- image marketplace,
- watermark,
- foto brand kompetitor,
- asset berhak cipta tidak jelas.

## Reference demo images yang relevan

### Pillow close-up

Photographer: Nathan Waters — Unsplash  
Free under Unsplash License.

```text
https://images.unsplash.com/photo-1620751852890-a89137ec78b9?auto=format&fit=crop&q=82&w=1600
```

Cocok untuk:

- Bantal Hotel Premium
- Bantal Microfiber

### Luxury bedding / hero

Photographer: Antonio Araujo — Unsplash  
Free under Unsplash License.

```text
https://images.unsplash.com/photo-1776763255122-3d35e32aee64?auto=format&fit=crop&q=82&w=2000
```

Cocok untuk:

- hero landing page,
- banner bedding premium.

### White pillows / elegant room

Photographer: Chesley McCarty — Unsplash  
Free under Unsplash License.

```text
https://images.unsplash.com/photo-1613618902610-95d88084ee11?auto=format&fit=crop&q=82&w=1600
```

Cocok untuk:

- guling/bantal related visual,
- editorial section.

Image hanya seed/demo.

Saat produk asli tersedia, admin dapat menggantinya lewat R2.

Pastikan `@nuxt/image` mengizinkan remote source `images.unsplash.com`.

---

# 38. DEMO SEED DATA

Buat migration atau script seed development.

Jangan seolah harga ini harga resmi bisnis. Tandai di source sebagai demo seed.

Contoh:

## Bantal

```text
SKU: PS-BTL-001
Nama: Bantal Hotel Premium 900gr
Harga demo: 89000
Stock: 26
Threshold: 5
```

```text
SKU: PS-BTL-002
Nama: Bantal Microfiber Standard
Harga demo: 69000
Stock: 38
Threshold: 8
```

## Guling

```text
SKU: PS-GLG-001
Nama: Guling Microfiber Premium
Harga demo: 79000
Stock: 19
Threshold: 5
```

## Kasur

```text
SKU: PS-KSR-001
Nama: Kasur Busa Single 90 × 200
Harga demo: 725000
Stock: 7
Threshold: 3
```

```text
SKU: PS-KSR-002
Nama: Kasur Busa Double 160 × 200
Harga demo: 1250000
Stock: 4
Threshold: 2
```

Data harus mudah dihapus / diganti.

---

# 39. SEARCH

Public search:

Cari pada:

- name,
- SKU,
- short description.

Gunakan query parameter.

Escape / parameterize query.

Untuk awal cukup `LIKE`.

Contoh:

```sql
WHERE (
  name LIKE ?
  OR sku LIKE ?
  OR short_description LIKE ?
)
AND deleted_at IS NULL
AND is_active = 1
```

Jika data sangat besar di masa depan, baru pertimbangkan FTS.

---

# 40. PAGINATION

Public product list dan admin tables gunakan server-side pagination.

Default:

```text
Public: 12 / page
Admin: 20 / page
Reports: 30 / page
```

Maximum `limit` API harus dibatasi agar client tidak meminta ribuan rows.

---

# 41. SEO

Public pages wajib SEO-friendly.

## Homepage

Title:

```text
ProShop — Produsen Bantal, Guling & Kasur
```

Description:

```text
Temukan produk bantal, guling, dan kasur ProShop. Cek harga dan stok, lalu konsultasikan kebutuhan langsung melalui WhatsApp.
```

## Product detail

Dynamic:

```text
{Product Name} | ProShop
```

Gunakan:

- `useSeoMeta`
- canonical URL
- Open Graph
- product image
- description.

Tambahkan structured data Product hanya jika datanya valid.

Karena tidak ada checkout online, jangan mengklaim purchase availability online yang tidak benar.

---

# 42. PERFORMANCE

Target:

- Lighthouse performance baik,
- LCP hero image optimized,
- lazy load product images,
- ukuran JS wajar,
- SSR halaman public,
- pagination server side.

Gunakan:

- `NuxtImg`,
- correct width/height,
- `loading="lazy"` selain hero,
- preload hero jika memang LCP,
- WebP/AVIF jika pipeline mendukung.

Jangan load seluruh shadcn component library.

Hanya generate komponen yang dipakai.

---

# 43. RESPONSIVE BREAKPOINT BEHAVIOR

## Mobile

- header compact,
- nav drawer,
- hero stack,
- category horizontal scroll,
- 1–2 column product,
- WhatsApp CTA nyaman dengan thumb,
- admin sidebar menjadi drawer,
- table admin dapat memakai responsive horizontal scroll.

## Tablet

- 2–3 columns product,
- filter lebih compact.

## Desktop

- max content width sekitar 1280–1440px,
- 3–4 columns product,
- public sidebar kategori bila layout cocok,
- admin sidebar fixed.

Jangan paksa desktop layout mengecil begitu saja ke mobile.

---

# 44. ACCESSIBILITY

Minimum:

- semantic heading order,
- accessible buttons,
- input labels,
- error bound ke input,
- keyboard navigation,
- focus visible,
- dialog focus trap via Reka,
- alt text image,
- sufficient contrast,
- target touch minimal ~44px.

Gold text di white jangan terlalu pucat.

---

# 45. LOADING / EMPTY / ERROR STATES

Setiap data page harus memiliki:

- skeleton loading,
- empty state,
- error state,
- retry action jika relevan.

Contoh katalog kosong:

`Tidak ada produk yang cocok dengan filter ini.`

Jangan tampilkan spinner full-page terus menerus.

---

# 46. TOAST / FEEDBACK

Admin mutation:

Success:

- Produk berhasil disimpan
- Stok masuk berhasil dicatat
- Stok keluar berhasil dicatat
- Foto berhasil dihapus

Error:

- Gunakan message manusiawi.
- Jangan tampilkan stack trace.

Destructive action wajib confirm.

---

# 47. SOFT DELETE

Produk:

- set `deleted_at`,
- set `is_active = 0`.

Jangan delete inventory history.

Public query selalu:

```sql
deleted_at IS NULL
AND is_active = 1
```

Admin dapat menampilkan archived jika nanti dibutuhkan.

---

# 48. AUDIT LOG

Minimal catat:

- login success optional,
- create product,
- edit product,
- delete/disable product,
- stock IN,
- stock OUT,
- adjustment,
- setting change.

`metadata_json` jangan menyimpan password/token.

---

# 49. ADMIN MIDDLEWARE

Semua `/api/admin/*` wajib auth.

Jangan hanya melindungi page route.

Jika user mengetahui endpoint langsung, endpoint tetap harus return `401`.

Page middleware juga digunakan untuk UX redirect.

---

# 50. CSRF / MUTATION PROTECTION

Karena auth menggunakan cookie:

- SameSite cookie,
- mutation hanya menerima expected methods,
- cek Origin/Host untuk state-changing requests jika practical,
- jangan enable CORS wildcard,
- API admin same-origin.

---

# 51. RATE LIMIT LOGIN

Implement lightweight login protection.

Minimum:

- setelah beberapa login gagal, beri delay / cooldown,
- jangan memberi tahu apakah email terdaftar.

Response:

`Email atau password tidak sesuai.`

Tidak:

`Email ditemukan, password salah.`

Jika rate limit distributed sulit tanpa store tambahan, implement DB-backed login attempt sederhana atau documented minimal fallback.

---

# 52. ADMIN CREATION SCRIPT

Buat:

```text
scripts/create-admin.ts
```

Input melalui env atau CLI:

- name
- email
- password

Hash password.

Insert D1 melalui D1 REST client / Cloudflare API.

Jangan hardcode:

```text
admin@admin.com
admin123
```

di seed production.

---

# 53. MIGRATION WORKFLOW

README harus mengajarkan:

1. buat D1 database,
2. copy Account ID,
3. copy Database ID,
4. buat API token dengan permission yang minimum,
5. jalankan migration,
6. buat admin.

Boleh menggunakan Wrangler hanya untuk management/migration.

Contoh konseptual:

```bash
npx wrangler d1 execute proshop-db --remote --file=database/migrations/0001_initial.sql
```

Sesuaikan dengan konfigurasi project yang benar.

---

# 54. R2 SETUP README

Jelaskan:

1. buat bucket,
2. buat R2 API token,
3. set access key,
4. set secret key,
5. set bucket name,
6. konfigurasi public read/custom domain,
7. isi `NUXT_PUBLIC_R2_BASE_URL`,
8. konfigurasi CORS untuk upload dari domain Vercel jika direct PUT digunakan.

Jangan memasukkan credential nyata ke README.

---

# 55. VERCEL ENV README

List variable yang harus dimasukkan ke:

```text
Project
→ Settings
→ Environment Variables
```

Environment:

- Production
- Preview bila ingin preview DB sama / terpisah
- Development bila menggunakan Vercel env pull

Sarankan preview tidak melakukan destructive test ke production DB.

---

# 56. DATE / TIME

Database simpan UTC ISO-compatible timestamp.

Di UI tampilkan Indonesia locale:

```ts
new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short',
})
```

Jika business timezone diketahui kemudian, masukkan ke settings.

Jangan mencampur random timezone formatting.

---

# 57. ID

Gunakan Nano ID atau crypto UUID.

Prefer:

```ts
crypto.randomUUID()
```

Jika ingin sortable ID gunakan nanoid secara konsisten.

Jangan memakai incremental ID yang terlihat sebagai order count.

---

# 58. ERROR LOGGING

Production:

- `console.error` terstruktur server-side boleh untuk error penting,
- jangan log password,
- jangan log API token,
- jangan log raw cookie session.

Frontend:

- user melihat friendly error.

---

# 59. TEST MINIMUM

Implement test minimal untuk critical logic bila test setup tidak terlalu berat.

Prioritas:

1. IDR formatter
2. WhatsApp message builder
3. stock OUT validation
4. adjustment delta calculation
5. auth token hash utility
6. product schema

Jika menambah E2E:

- login admin,
- tambah product,
- stock IN,
- stock OUT,
- public product visible.

---

# 60. ACCEPTANCE CRITERIA — PUBLIC

Selesai bila:

- [ ] `/` tampil professional dan responsive.
- [ ] landing page terasa white-gold luxury.
- [ ] tidak terasa template AI.
- [ ] catalog product mengambil data dari D1.
- [ ] search bekerja.
- [ ] category filter bekerja.
- [ ] product detail bekerja.
- [ ] harga format IDR.
- [ ] stock status sesuai database.
- [ ] order membuka WhatsApp dengan message terisi.
- [ ] tidak ada cart.
- [ ] tidak ada checkout.
- [ ] tidak ada payment.
- [ ] image responsive dan optimized.
- [ ] page punya loading / empty / error states.

---

# 61. ACCEPTANCE CRITERIA — ADMIN

- [ ] admin login valid.
- [ ] protected admin API.
- [ ] dashboard metrics real.
- [ ] CRUD category.
- [ ] CRUD product.
- [ ] product image upload R2.
- [ ] cover image.
- [ ] edit price.
- [ ] edit description.
- [ ] initial stock.
- [ ] stock adjustment tercatat sebagai movement.
- [ ] barang masuk.
- [ ] barang keluar.
- [ ] stock tidak bisa negatif.
- [ ] low stock status.
- [ ] inventory report.
- [ ] date filter.
- [ ] product/category/type filter.
- [ ] CSV export.
- [ ] audit log minimal.
- [ ] logout.

---

# 62. ACCEPTANCE CRITERIA — ENGINEERING

- [ ] TypeScript.
- [ ] Nuxt 4.
- [ ] Pinia.
- [ ] Tailwind 4.
- [ ] shadcn-vue.
- [ ] Reka UI.
- [ ] Headless UI digunakan secara terbatas jika diperlukan.
- [ ] D1 server-side.
- [ ] R2 server credential tidak bocor.
- [ ] `.env` ignored.
- [ ] `.env.example` tersedia.
- [ ] production build sukses.
- [ ] lint/typecheck sukses.
- [ ] README lengkap.
- [ ] Git repository bersih.
- [ ] siap import Vercel.

---

# 63. RECOMMENDED FILE TREE

```text
proshop/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── brand/
│   │   ├── inventory/
│   │   ├── layout/
│   │   ├── product/
│   │   └── ui/
│   │
│   ├── composables/
│   │   ├── useCurrency.ts
│   │   ├── useProductFilters.ts
│   │   └── useWhatsApp.ts
│   │
│   ├── layouts/
│   │   ├── default.vue
│   │   └── admin.vue
│   │
│   ├── middleware/
│   │   └── admin-auth.ts
│   │
│   ├── pages/
│   │   ├── index.vue
│   │   ├── produk/
│   │   ├── tentang.vue
│   │   ├── kontak.vue
│   │   └── admin/
│   │
│   ├── plugins/
│   │   └── ssr-width.ts
│   │
│   ├── stores/
│   │   ├── admin.ts
│   │   ├── catalog.ts
│   │   └── ui.ts
│   │
│   └── types/
│       ├── api.ts
│       ├── product.ts
│       └── inventory.ts
│
├── database/
│   ├── migrations/
│   │   └── 0001_initial.sql
│   └── seeds/
│       └── development.sql
│
├── public/
│   ├── favicon.svg
│   ├── icon-192.png
│   └── og-default.jpg
│
├── scripts/
│   └── create-admin.ts
│
├── server/
│   ├── api/
│   ├── middleware/
│   └── utils/
│
├── shared/
│   ├── schemas/
│   └── utils/
│
├── .env.example
├── .gitignore
├── components.json
├── nuxt.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

---

# 64. PACKAGE INITIALIZATION GUIDANCE

Gunakan current stable versions yang kompatibel.

Konseptual:

```bash
npm create nuxt@latest .
npm install

npm install \
  @pinia/nuxt pinia \
  @vueuse/nuxt \
  @nuxt/image \
  shadcn-nuxt \
  reka-ui \
  @headlessui/vue \
  lucide-vue-next \
  zod \
  vee-validate \
  @vee-validate/zod \
  date-fns \
  nanoid \
  bcryptjs \
  @aws-sdk/client-s3 \
  @aws-sdk/s3-request-presigner \
  core-js

npm install -D tailwindcss @tailwindcss/vite
```

Kemudian init shadcn-vue menggunakan setup Nuxt terbaru.

Jangan blindly copy command lama jika CLI terbaru berubah.

---

# 65. VISUAL DETAIL — PUBLIC PRODUCT GRID

Product cards harus punya rhythm konsisten.

Suggested:

```text
image
12px gap
category + SKU
6px gap
product title
10px gap
price
12px gap
stock + action
```

Image:

- `object-cover`
- background ivory,
- tidak stretch.

Hover desktop:

- border sedikit lebih gold,
- image scale max 1.02,
- transition 180–220ms.

Tidak perlu card “terbang” 15px ke atas.

---

# 66. VISUAL DETAIL — ADMIN TABLE

Admin table:

- row height nyaman 52–60px,
- sticky header bila panjang,
- hover subtle,
- number align right untuk harga/qty,
- action dropdown,
- badges small.

Mobile:

- horizontal scroll,
- jangan memaksa semua kolom menjadi card jika malah panjang.

---

# 67. STOCK BADGE RULE

```ts
if (stock === 0) {
  return 'Habis'
}

if (stock <= lowStockThreshold) {
  return 'Menipis'
}

return 'Tersedia'
```

Public label dapat berupa:

```text
Stok 26
Stok menipis · 3
Stok habis
```

Admin lebih eksplisit.

---

# 68. PRODUCT AVAILABILITY

Produk yang inactive:

- tidak muncul public.

Produk soft deleted:

- tidak muncul public.

Produk stock 0:

- tetap dapat muncul public jika active,
- status `Habis`,
- WhatsApp CTA menjadi `Tanya ketersediaan`.

---

# 69. IMAGE FALLBACK

Jika product tidak memiliki image:

Gunakan local neutral placeholder dengan logo ProShop.

Jangan memakai gambar remote random baru setiap render.

Fallback harus deterministic.

---

# 70. COPYWRITING STYLE

Bahasa:

- natural Indonesia,
- ringkas,
- tidak hiperbola.

Baik:

`Bantal microfiber dengan isi padat dan permukaan lembut untuk kebutuhan rumah maupun penginapan.`

Hindari:

`Rasakan revolusi tidur tiada tara dengan inovasi premium yang akan mengubah hidup Anda selamanya.`

---

# 71. TENTANG

`/tentang`

Buat halaman sederhana:

- intro ProShop,
- fokus produksi,
- kategori produk,
- cara pemesanan,
- CTA WhatsApp.

Jangan invent:

- tahun berdiri,
- jumlah customer,
- lokasi pabrik,
- sertifikasi,
- kapasitas produksi

jika datanya belum diberikan.

Gunakan copy placeholder yang aman dan mudah diedit.

---

# 72. KONTAK

`/kontak`

Tampilkan:

- WhatsApp,
- email jika configured,
- alamat jika configured,
- jam layanan jika configured.

CTA WhatsApp paling dominan.

Map hanya jika alamat nyata telah tersedia.

Jangan menggunakan alamat fiktif.

---

# 73. SETTINGS FALLBACK

Untuk data setting yang belum ada:

App harus punya fallback aman dari runtime config atau default generic.

Contoh:

```ts
businessName = setting.business_name ?? 'ProShop'
whatsapp = setting.whatsapp ?? runtimeConfig.public.whatsappNumber
```

---

# 74. DATA FETCHING

Public:

- SSR `useAsyncData`,
- filter fetch client setelah route change,
- cache ringan jika masuk akal.

Admin:

- `useFetch`/`$fetch`,
- refresh table setelah mutation.

Hindari waterfall request yang tidak perlu.

Dashboard sebaiknya punya satu aggregated API.

---

# 75. PUBLIC API CACHE

Product listing boleh memiliki cache pendek jika mudah, tetapi setelah admin update jangan membuat data stale terlalu lama.

Awal:

- no aggressive CDN cache untuk inventory stock,
- atau cache hanya sangat singkat.

Stock harus terasa current.

---

# 76. SECURITY HEADERS

Tambahkan reasonable headers:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy` minimal
- frame protection melalui CSP/frame-ancestors jika CSP dibuat.

Jangan membuat CSP yang rusak untuk images R2/Unsplash.

---

# 77. FILE UPLOAD SECURITY

Server-side presign endpoint harus memastikan:

Allowed MIME:

```text
image/jpeg
image/png
image/webp
```

Max:

```text
5 MB
```

Tidak menerima:

- SVG upload dari admin untuk product,
- HTML,
- executable,
- arbitrary content type.

Object key generated server.

---

# 78. DATA TABLE UX

Admin product/report table:

- filters di atas,
- clear filter,
- query param,
- pagination.

Filter yang aktif jangan hilang setelah refresh.

Gunakan URL query untuk admin report:

```text
/admin/laporan?from=2026-08-01&to=2026-08-31&type=OUT&page=1
```

---

# 79. CSV EXPORT FIELDS

CSV order:

```text
Tanggal
Referensi
SKU
Produk
Kategori
Jenis
Jumlah
Stok Sebelum
Stok Sesudah
Keterangan
Admin
```

Movement label Indonesia:

```text
IN             -> Barang Masuk
OUT            -> Barang Keluar
ADJUSTMENT_IN  -> Penyesuaian Tambah
ADJUSTMENT_OUT -> Penyesuaian Kurang
```

---

# 80. DASHBOARD QUERY

Satu endpoint:

```text
GET /api/admin/dashboard
```

Return:

```json
{
  "data": {
    "metrics": {
      "activeProducts": 18,
      "totalUnits": 254,
      "lowStockProducts": 4,
      "whatsappClicksThisMonth": 37
    },
    "lowStock": [],
    "recentMovements": []
  }
}
```

Jangan client melakukan 8 request terpisah jika dapat digabung.

---

# 81. PRODUCT LIST API

Example:

```text
GET /api/public/products
?q=
&category=
&stock=
&sort=
&page=1
&limit=12
```

Response:

```json
{
  "data": [
    {
      "id": "...",
      "slug": "...",
      "sku": "...",
      "name": "...",
      "price": 89000,
      "stock": 26,
      "lowStockThreshold": 5,
      "category": {
        "name": "Bantal",
        "slug": "bantal"
      },
      "coverImage": {
        "url": "...",
        "alt": "..."
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 40,
    "totalPages": 4
  }
}
```

---

# 82. PRODUCT DETAIL API

```text
GET /api/public/products/[slug]
```

Return:

- base product,
- images ordered,
- specifications parsed,
- category,
- related products.

404 jika:

- tidak ditemukan,
- deleted,
- inactive.

---

# 83. ADMIN PRODUCT UPDATE

Saat mengubah stock melalui product edit:

Server harus:

1. fetch current stock,
2. calculate delta,
3. validate,
4. batch movement + update,
5. audit.

Frontend tidak boleh membuat movement sendiri.

---

# 84. NO FAKE ORDER SYSTEM

PENTING.

Jangan membuat:

```text
orders
order_items
cart
checkout
payments
shipping
customer_accounts
```

kecuali user meminta pada versi berikutnya.

`whatsapp_click_events` bukan order.

Jangan menampilkan “Order #123” di admin.

---

# 85. FUTURE-PROOFING

Code harus mudah dikembangkan untuk:

- supplier,
- wholesale price,
- variant size,
- reseller,
- purchase order,
- invoice

tetapi jangan implement semua sekarang.

Keep schema sederhana.

---

# 86. README FINAL WAJIB

README akhir harus memiliki:

```text
1. Project overview
2. Features
3. Tech stack
4. Requirements
5. Local installation
6. Cloudflare D1 setup
7. D1 migration
8. Cloudflare R2 setup
9. Environment variables
10. Create first admin
11. Development
12. Build
13. GitHub push
14. Import to Vercel
15. Production checklist
16. Common troubleshooting
```

---

# 87. BUILD COMMANDS

`package.json` minimal:

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "typecheck": "nuxt typecheck"
  }
}
```

Tambahkan lint jika ESLint disetup.

---

# 88. FINAL PRE-DEPLOY CHECKLIST

Sebelum coding agent menyatakan selesai:

## Function

- [ ] homepage fetch D1
- [ ] product filter
- [ ] detail
- [ ] WA link
- [ ] admin login
- [ ] category CRUD
- [ ] product CRUD
- [ ] R2 upload
- [ ] stock IN
- [ ] stock OUT
- [ ] adjustment
- [ ] report
- [ ] CSV

## Security

- [ ] no secret in browser
- [ ] no secret in Git
- [ ] admin APIs protected
- [ ] bcrypt password
- [ ] httpOnly session
- [ ] upload validated
- [ ] SQL parameterized
- [ ] stock cannot negative

## UI

- [ ] desktop
- [ ] mobile
- [ ] tablet
- [ ] no broken overflow
- [ ] no AI slop look
- [ ] white/gold theme
- [ ] accessible focus
- [ ] skeleton
- [ ] empty state
- [ ] error state

## Engineering

- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] lint if configured
- [ ] no console secret
- [ ] README accurate

---

# 89. DEFINITION OF DONE

Project dianggap selesai hanya jika:

1. Bisa `npm install`.
2. Bisa `npm run dev`.
3. Bisa `npm run build`.
4. Public catalog bekerja dengan D1.
5. Admin bekerja dengan D1.
6. Foto admin bekerja dengan R2.
7. Stock movement konsisten.
8. WhatsApp order bekerja.
9. Tidak ada cart.
10. Bisa di-push GitHub.
11. Bisa di-import Vercel.
12. Dokumentasi setup tersedia.
13. UI terasa seperti produk startup/brand production yang dirancang manusia, bukan generated dashboard/template generik.

---

# 90. REFERENSI TEKNIS YANG HARUS DIJADIKAN ACUAN

Gunakan dokumentasi resmi terbaru ketika implementation detail berbeda dengan asumsi pada dokumen ini:

- Nuxt Deployment / Vercel:
  `https://nuxt.com/deploy/vercel`
- Nuxt 4:
  `https://nuxt.com/docs/4.x/`
- shadcn-vue:
  `https://www.shadcn-vue.com/`
- Reka UI:
  `https://www.reka-ui.com/`
- Pinia:
  `https://pinia.vuejs.org/`
- Cloudflare D1:
  `https://developers.cloudflare.com/d1/`
- Cloudflare D1 API:
  `https://developers.cloudflare.com/api/resources/d1/`
- Cloudflare R2:
  `https://developers.cloudflare.com/r2/`
- R2 presigned URLs:
  `https://developers.cloudflare.com/r2/api/s3/presigned-urls/`

Jika dokumentasi resmi terbaru berbeda dengan syntax di contoh dokumen ini, ikuti dokumentasi resmi terbaru tanpa mengubah arsitektur bisnis inti.

---

# 91. PRIORITAS IMPLEMENTASI

Kerjakan dalam urutan berikut.

## Phase 1 — Foundation

1. Nuxt 4
2. TypeScript
3. Tailwind
4. shadcn-vue / Reka
5. Pinia
6. layout public/admin
7. theme

## Phase 2 — Cloudflare

1. D1 client
2. migration
3. schema
4. R2 client
5. env
6. seed

## Phase 3 — Public

1. homepage
2. catalog
3. detail
4. search/filter
5. WhatsApp

## Phase 4 — Auth

1. admin create script
2. login
3. session
4. admin route protection
5. logout

## Phase 5 — Product administration

1. categories
2. product CRUD
3. image upload
4. product status

## Phase 6 — Inventory

1. stock overview
2. IN
3. OUT
4. adjustment
5. low-stock detection

## Phase 7 — Reports

1. report query
2. filters
3. summary
4. CSV

## Phase 8 — Polish

1. loading states
2. errors
3. accessibility
4. responsive
5. SEO
6. performance
7. build fix
8. README
9. final Git readiness

---

# 92. FINAL AGENT DIRECTIVE

Bangun project ini sebagai aplikasi nyata.

Jangan berhenti pada desain statis.

Jangan mengganti kebutuhan order WhatsApp menjadi keranjang.

Jangan memindahkan deployment utama dari Vercel.

Gunakan Cloudflare D1 untuk database dan Cloudflare R2 untuk foto.

Gunakan Nuxt/Vue equivalents yang benar untuk stack shadcn/Radix:
**shadcn-vue + Reka UI**.

Gunakan style **white + restrained gold + editorial spacing**.

Hasil akhir harus terasa seperti sistem katalog + inventory milik bisnis produksi yang benar-benar siap dipakai.
