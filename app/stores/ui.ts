import type { Product } from '~/types/product'
export const useUiStore=defineStore('ui',()=>{const mobileNav=ref(false),adminSidebar=ref(false),orderProduct=ref<Product|null>(null);return {mobileNav,adminSidebar,orderProduct}})
