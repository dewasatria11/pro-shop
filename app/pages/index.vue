<script setup lang="ts">
import { ArrowRight, Check, MessageCircle } from "lucide-vue-next";
const { data: settings } = await useFetch("/api/public/settings", {
  transform: (r: any) => r.data,
});
const heroImages = computed(() => [
  settings.value?.hero_image_1,
  settings.value?.hero_image_2,
  settings.value?.hero_image_3,
  settings.value?.hero_image_4,
  settings.value?.hero_image_5,
].filter(Boolean) as string[]);
const {
  data: catalog,
  pending,
  error,
  refresh,
} = await useFetch("/api/public/products", {
  query: { limit: 6 },
  transform: (r: any) => r,
});
useSeoMeta({
  title: "ProShop — Produsen Bantal, Guling & Kasur",
  description:
    "Temukan produk bantal, guling, dan kasur ProShop. Cek harga dan stok, lalu konsultasikan kebutuhan langsung melalui WhatsApp.",
});
</script>
<template>
  <div>
    <section class="hero">
      <div class="container-main hero-grid">
        <div>
          <span class="eyebrow">{{ settings?.hero_eyebrow }}</span>
          <h1 class="display">{{ settings?.hero_title }}</h1>
          <p>{{ settings?.hero_description }}</p>
          <div class="hero-actions">
            <NuxtLink class="btn btn-primary" to="/produk"
              >{{ settings?.hero_cta }}<ArrowRight :size="18" /></NuxtLink
            ><a
              class="btn btn-outline"
              :href="`https://wa.me/${$config.public.whatsappNumber}`"
              ><MessageCircle :size="18" />Konsultasi WhatsApp</a
            >
          </div>
          <div class="micro">
            <span
              v-for="x in [
                'Produksi langsung',
                'Stok terpantau',
                'Bisa konsultasi kebutuhan',
              ]"
              :key="x"
              ><Check :size="15" />{{ x }}</span
            >
          </div>
        </div>
        <div class="visual"><HeroSlideshow :images="heroImages" /></div>
      </div>
    </section>
    <section class="section">
      <div class="container-main">
        <div class="section-head">
          <div>
            <span class="eyebrow">KATALOG PILIHAN</span>
            <h2 class="display">Produk ProShop</h2>
          </div>
          <NuxtLink to="/produk"
            >Lihat semua produk <ArrowRight :size="17"
          /></NuxtLink>
        </div>
        <div v-if="pending" class="loading">Menyiapkan katalog…</div>
        <div v-else-if="error" class="loading">
          Katalog belum dapat dimuat.
          <button @click="refresh()">Coba lagi</button>
        </div>
        <ProductGrid v-else :products="catalog?.data || []" />
      </div>
    </section>
    <section class="values">
      <div class="container-main values-grid">
        <div
          v-for="(x, i) in [
            [
              '01',
              'Produksi terkontrol',
              'Setiap produk dibuat dengan perhatian pada isi, ukuran, dan kerapian.',
            ],
            [
              '02',
              'Pilihan ukuran & material',
              'Diskusikan kebutuhan rumah, penginapan, kos, atau reseller.',
            ],
            [
              '03',
              'Pemesanan langsung',
              'Informasi stok dan detail pemesanan ditangani melalui WhatsApp.',
            ],
          ]"
          :key="x[0]"
        >
          <small>{{ x[0] }}</small>
          <h3>{{ x[1] }}</h3>
          <p>{{ x[2] }}</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container-main story">
        <NuxtImg
          src="https://images.unsplash.com/photo-1613618902610-95d88084ee11?auto=format&fit=crop&q=82&w=1600"
          alt="Material dan bantal ProShop"
          width="900"
          height="700"
        />
        <div>
          <span class="eyebrow">DIBUAT UNTUK DIPAKAI SETIAP HARI</span>
          <h2 class="display">Kenyamanan dimulai dari detail produksi.</h2>
          <p>
            ProShop berfokus pada bantal, guling, dan kasur yang dibuat untuk
            kebutuhan nyata. Pilihan ukuran dan material dapat dikonsultasikan
            sesuai penggunaan.
          </p>
          <p>
            Kami melayani kebutuhan rumah hingga pemesanan dalam jumlah banyak
            tanpa proses yang berbelit.
          </p>
          <NuxtLink to="/tentang" class="btn btn-outline"
            >Tentang ProShop</NuxtLink
          >
        </div>
      </div>
    </section>
    <section class="cta">
      <div class="container-main">
        <div>
          <span class="eyebrow">KONSULTASI LANGSUNG</span>
          <h2 class="display">Butuh ukuran atau jumlah tertentu?</h2>
          <p>
            Hubungi ProShop untuk kebutuhan rumah, penginapan, kos, reseller,
            atau pemesanan dalam jumlah banyak.
          </p>
        </div>
        <a
          class="btn btn-gold"
          :href="`https://wa.me/${$config.public.whatsappNumber}`"
          >Chat ProShop di WhatsApp</a
        >
      </div>
    </section>
  </div>
</template>
<style scoped>
.hero {
  padding: 4rem 0 3rem;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.02fr 0.98fr;
  align-items: center;
  gap: 4.5rem;
}
.hero h1 {
  font-size: clamp(3rem, 5.5vw, 5.4rem);
  line-height: 0.92;
  letter-spacing: -0.04em;
  margin: 1rem 0 1.5rem;
}
.hero p {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--muted);
  max-width: 650px;
}
.hero-actions,
.micro {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.8rem;
}
.micro {
  font-size: 0.78rem;
  color: var(--muted);
  gap: 1.2rem;
}
.micro span {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.visual {
  position: relative;
}
.visual img {
  width: 100%;
  aspect-ratio: 4/4.5;
  object-fit: cover;
  border-radius: 18px;
}
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 2rem;
}
.section-head h2,
.story h2,
.cta h2 {
  font-size: clamp(2.4rem, 4vw, 4rem);
  line-height: 1;
  margin: 0.5rem 0;
}
.section-head a {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
}
.loading {
  padding: 4rem;
  text-align: center;
  background: var(--surface);
  border-radius: 16px;
}
.values {
  background: #171717;
  color: white;
  padding: 3.2rem 0;
}
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.values-grid > div {
  padding: 0 2rem;
  border-left: 1px solid #ffffff22;
}
.values-grid small {
  color: var(--gold-soft);
}
.values-grid p {
  color: #aaa;
  line-height: 1.6;
}
.story {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 5rem;
}
.story img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 16px;
}
.story p,
.cta p {
  color: var(--muted);
  line-height: 1.7;
}
.cta {
  padding: 4rem 0;
  background: var(--gold-pale);
}
.cta > .container-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
}
.cta p {
  max-width: 740px;
}
@media (max-width: 800px) {
  .hero-grid,
  .story {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .hero {
    padding-top: 2.5rem;
  }
  .visual {
    order: -1;
  }
  .visual img {
    aspect-ratio: 16/10;
  }
  .values-grid {
    grid-template-columns: 1fr;
  }
  .values-grid > div {
    padding: 1.5rem 0;
    border-left: 0;
    border-bottom: 1px solid #ffffff22;
  }
  .cta > .container-main {
    display: block;
  }
  .cta .btn {
    margin-top: 1rem;
  }
}
@media (max-width: 500px) {
  .hero h1 {
    font-size: 3rem;
  }
  .hero-actions .btn {
    width: 100%;
  }
  .section-head {
    align-items: start;
    gap: 1rem;
  }
  .section-head > a {
    font-size: 0.8rem;
  }
}
</style>
