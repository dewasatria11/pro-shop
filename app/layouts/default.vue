<script setup lang="ts">
const {generalWhatsAppUrl}=useWhatsApp()
function enrichWhatsAppLink(event:MouseEvent){
  const anchor=(event.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="wa.me/"]')
  if(!anchor||anchor.href.includes('?text='))return
  event.preventDefault()
  const number=new URL(anchor.href).pathname.replace(/\D/g,'')
  window.open(generalWhatsAppUrl(`halaman ${document.title}`,number),'_blank','noopener')
}
</script>
<template><div @click.capture="enrichWhatsAppLink"><PublicHeader/><main><slot/></main><PublicFooter/><WhatsAppOrderDialog/></div></template>
