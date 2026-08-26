export const formatIDR=(value:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value)
export const stockStatus=(stock:number,threshold:number)=>stock===0?'Habis':stock<=threshold?'Menipis':'Tersedia'
export const adjustmentDelta=(before:number,after:number)=>({type:after>=before?'ADJUSTMENT_IN' as const:'ADJUSTMENT_OUT' as const,quantity:Math.abs(after-before)})
export const buildWhatsAppMessage=(product:{name:string;sku:string;price:number},quantity=1,name='',note='')=>[
  'Halo ProShop, saya ingin menanyakan produk berikut:','',`Produk: ${product.name}`,`Kode: ${product.sku}`,`Harga: ${formatIDR(product.price)}`,`Jumlah: ${quantity}`,
  name?`Nama: ${name}`:'',note?`Catatan: ${note}`:'','', 'Mohon informasi ketersediaan dan detail pemesanannya. Terima kasih.'
].filter((line,i,a)=>line!==''||a[i-1]!=='').join('\n')
