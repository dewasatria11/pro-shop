import { d1Query, hasD1 } from "../../utils/d1";
export default defineEventHandler(async (event) => {
  const c = useRuntimeConfig(event);
  const defaults = {
    business_name: "ProShop",
    tagline: "Produsen Bantal, Guling & Kasur",
    whatsapp: c.public.whatsappNumber,
    address: "",
    email: "",
    service_hours: "Senin–Sabtu, 08.00–17.00",
    hero_eyebrow: "PRODUK TIDUR BUATAN LOKAL",
    hero_title:
      "Tidur lebih nyaman dimulai dari produk yang dibuat dengan benar.",
    hero_description:
      "Bantal, guling, dan kasur produksi ProShop dengan pilihan ukuran, material, dan stok yang dapat langsung dikonsultasikan melalui WhatsApp.",
    hero_cta: "Lihat Produk",
    hero_image_1: "https://images.unsplash.com/photo-1628746234641-28eb583a51b4?auto=format&fit=crop&q=82&w=2000",
    hero_image_2: "https://images.unsplash.com/photo-1561049933-c8fbef47b329?auto=format&fit=crop&q=82&w=2000",
    hero_image_3: "https://images.unsplash.com/photo-1620751852890-a89137ec78b9?auto=format&fit=crop&q=82&w=2000",
    hero_image_4: "https://images.unsplash.com/photo-1631015108855-724e4712a3f9?auto=format&fit=crop&q=82&w=2000",
    hero_image_5: "https://images.unsplash.com/photo-1769123300291-81262063e667?auto=format&fit=crop&q=82&w=2000",
    default_low_stock_threshold: "5",
  };
  if (!hasD1(event)) return { data: defaults };
  const rows = await d1Query<{ key: string; value: string }>(
    event,
    "SELECT key,value FROM settings",
  );
  return {
    data: {
      ...defaults,
      ...Object.fromEntries(rows.map((r) => [r.key, r.value])),
    },
  };
});
