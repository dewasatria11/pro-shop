<script setup lang="ts">
definePageMeta({ layout: "admin" });
const { data } = await useFetch("/api/admin/settings", {
  transform: (r: any) => r.data,
});
const f = reactive({
  business_name: "ProShop",
  tagline: "Produsen Bantal, Guling & Kasur",
  whatsapp: "",
  address: "",
  email: "",
  service_hours: "",
  hero_eyebrow: "PRODUK TIDUR BUATAN LOKAL",
  hero_title: "",
  hero_description: "",
  hero_cta: "Lihat Produk",
  hero_image_1: "https://images.unsplash.com/photo-1628746234641-28eb583a51b4?auto=format&fit=crop&q=82&w=2000",
  hero_image_2: "https://images.unsplash.com/photo-1561049933-c8fbef47b329?auto=format&fit=crop&q=82&w=2000",
  hero_image_3: "https://images.unsplash.com/photo-1620751852890-a89137ec78b9?auto=format&fit=crop&q=82&w=2000",
  hero_image_4: "https://images.unsplash.com/photo-1631015108855-724e4712a3f9?auto=format&fit=crop&q=82&w=2000",
  hero_image_5: "https://images.unsplash.com/photo-1769123300291-81262063e667?auto=format&fit=crop&q=82&w=2000",
  default_low_stock_threshold: "5",
});
watch(data, (v) => Object.assign(f, v || {}), { immediate: true });
const message = ref(""),
  error = ref("");
async function save() {
  message.value = "";
  error.value = "";
  try {
    await $fetch("/api/admin/settings", { method: "PUT", body: f });
    message.value = "Pengaturan berhasil disimpan.";
  } catch (e: any) {
    error.value = e.data?.statusMessage || "Gagal menyimpan pengaturan.";
  }
}
</script>
<template>
  <form class="admin-page" @submit.prevent="save">
    <AdminPageHeader
      title="Pengaturan"
      description="Informasi toko dan konten utama yang penting."
    />
    <section class="panel block">
      <h2>Store</h2>
      <div class="form-grid">
        <div>
          <label class="label">Nama bisnis</label
          ><input v-model="f.business_name" class="field" >
        </div>
        <div>
          <label class="label">Tagline</label
          ><input v-model="f.tagline" class="field" >
        </div>
        <div>
          <label class="label">WhatsApp (format E.164)</label
          ><input v-model="f.whatsapp" class="field" placeholder="62812..." >
        </div>
        <div>
          <label class="label">Email</label
          ><input v-model="f.email" class="field" type="email" >
        </div>
        <div>
          <label class="label">Alamat</label
          ><input v-model="f.address" class="field" >
        </div>
        <div>
          <label class="label">Jam layanan</label
          ><input v-model="f.service_hours" class="field" >
        </div>
      </div>
    </section>
    <section class="panel block">
      <h2>Homepage</h2>
      <div>
        <label class="label">Eyebrow</label
        ><input v-model="f.hero_eyebrow" class="field" >
      </div>
      <div>
        <label class="label">Judul hero</label
        ><input v-model="f.hero_title" class="field" >
      </div>
      <div>
        <label class="label">Deskripsi hero</label
        ><textarea v-model="f.hero_description" class="field" rows="3" />
      </div>
      <div>
        <label class="label">Label CTA</label
        ><input v-model="f.hero_cta" class="field" >
      </div>
      <div class="hero-images">
        <div v-for="index in 5" :key="index" class="image-field">
          <NuxtImg :src="f[`hero_image_${index}` as keyof typeof f]" :alt="`Preview gambar hero ${index}`" width="240" height="150"/>
          <div><label class="label">Gambar hero {{index}}</label><input v-model="f[`hero_image_${index}` as keyof typeof f]" class="field" type="url" placeholder="https://..." required></div>
        </div>
        <small class="muted">Gunakan URL gambar HTTPS. Kelima gambar tampil bergantian setiap 5 detik.</small>
      </div>
    </section>
    <section class="panel block">
      <h2>Inventory</h2>
      <div>
        <label class="label">Default batas stok menipis</label
        ><input
          v-model="f.default_low_stock_threshold"
          class="field narrow"
          type="number"
          min="0"
        >
      </div>
    </section>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
    <button class="btn btn-primary save">Simpan pengaturan</button>
  </form>
</template>
<style scoped>
.block {
  padding: 1.3rem;
  display: grid;
  gap: 1rem;
}
.block h2 {
  font-size: 1rem;
  margin: 0;
}
.narrow {
  max-width: 180px;
}
.hero-images{display:grid;gap:.8rem;padding-top:.4rem}
.image-field{display:grid;grid-template-columns:120px 1fr;gap:1rem;align-items:center}
.image-field img{width:120px;height:76px;object-fit:cover;border-radius:10px;background:var(--surface)}
@media(max-width:600px){.image-field{grid-template-columns:1fr}.image-field img{width:100%;height:150px}}
.success {
  color: var(--success);
}
.save {
  justify-self: end;
}
</style>
