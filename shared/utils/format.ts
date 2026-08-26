export const formatIDR=(value:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value)
export const stockStatus=(stock:number,threshold:number)=>stock===0?'Habis':stock<=threshold?'Menipis':'Tersedia'
export const adjustmentDelta=(before:number,after:number)=>({type:after>=before?'ADJUSTMENT_IN' as const:'ADJUSTMENT_OUT' as const,quantity:Math.abs(after-before)})
export const buildWhatsAppMessage=(product:{name:string;sku:string;price:number;stock?:number},quantity=1,name='',note='',productUrl='')=>[
  'Halo ProShop 👋','',
  'Saya tertarik dengan produk berikut:',
  `🛏️ *${product.name}*`,
  `Kode produk: ${product.sku}`,
  `Harga satuan: ${formatIDR(product.price)}`,
  typeof product.stock==='number'?`Stok di website: ${product.stock} unit`:'',
  `Jumlah yang dibutuhkan: ${quantity} unit`,
  `Estimasi total: *${formatIDR(product.price*quantity)}*`,
  productUrl?`Link produk: ${productUrl}`:'','',
  name?`Nama saya: ${name}`:'',
  note?`Catatan/kebutuhan: ${note}`:'','',
  'Apakah produknya masih tersedia? Mohon informasi cara pemesanan dan ongkirnya. Terima kasih 🙏'
].filter((line,i,a)=>line!==''||a[i-1]!=='').join('\n')

export const buildGeneralWhatsAppMessage=(source='website ProShop')=>[
  'Halo ProShop 👋','',
  `Saya menghubungi dari ${source} dan ingin berkonsultasi mengenai produk ProShop.`,'',
  'Saya ingin menanyakan:',
  '• Produk/jenis: ',
  '• Ukuran: ',
  '• Jumlah: ',
  '• Lokasi pengiriman: ','',
  'Mohon informasi produk yang sesuai, harga, dan ketersediaannya. Terima kasih 🙏'
].join('\n')

export const buildWhatsAppUrl=(number:string,message:string)=>`https://wa.me/${number.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`
