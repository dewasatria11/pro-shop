<script setup lang="ts">
const props=defineProps<{images:string[]}>()
const active=ref(0)
const paused=ref(false)
let timer:ReturnType<typeof setInterval>|undefined
const validImages=computed(()=>props.images.filter(Boolean).slice(0,5))
function goTo(index:number){active.value=index}
function start(){
  stop()
  timer=setInterval(()=>{if(!paused.value&&validImages.value.length>1)active.value=(active.value+1)%validImages.value.length},5000)
}
function stop(){if(timer)clearInterval(timer)}
watch(validImages,images=>{if(active.value>=images.length)active.value=0},{deep:true})
onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <div class="slideshow" @mouseenter="paused=true" @mouseleave="paused=false">
    <NuxtImg
      v-for="(image,index) in validImages"
      :key="image"
      :src="image"
      :alt="`Koleksi bedding ProShop ${index+1}`"
      width="1200"
      height="1000"
      :preload="index===0"
      :loading="index===0?'eager':'lazy'"
      :class="{active:index===active}"
    />
    <div class="shade"/>
    <div class="caption"><span>Produksi ProShop</span><small>{{String(active+1).padStart(2,'0')}} / {{String(validImages.length).padStart(2,'0')}}</small></div>
    <div class="dots" aria-label="Pilih gambar hero">
      <button v-for="(_,index) in validImages" :key="index" type="button" :class="{active:index===active}" :aria-label="`Tampilkan gambar ${index+1}`" @click="goTo(index)"/>
    </div>
  </div>
</template>

<style scoped>
.slideshow{position:relative;aspect-ratio:4/4.5;overflow:hidden;border-radius:18px;background:#eee;box-shadow:0 30px 80px #57481820}
.slideshow>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.035);transition:opacity 1.4s cubic-bezier(.22,1,.36,1),transform 6s ease;will-change:opacity,transform}
.slideshow>img.active{opacity:1;transform:scale(1)}
.shade{position:absolute;inset:auto 0 0;height:38%;background:linear-gradient(transparent,#1118);pointer-events:none}
.caption{position:absolute;left:1rem;right:1rem;bottom:1rem;display:flex;align-items:center;justify-content:space-between;color:white;font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase}
.caption small{font-variant-numeric:tabular-nums;color:#ffffffcc}
.dots{position:absolute;top:1rem;right:1rem;display:flex;gap:.38rem}
.dots button{width:7px;height:7px;padding:0;border:1px solid #fff;background:#ffffff55;border-radius:999px;transition:width .35s ease,background .35s ease;cursor:pointer}
.dots button.active{width:24px;background:white}
@media(max-width:800px){.slideshow{aspect-ratio:16/10}}
@media(prefers-reduced-motion:reduce){.slideshow>img{transition:opacity .2s;transform:none}}
</style>
