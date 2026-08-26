export const useCatalogStore=defineStore('catalog',()=>{const query=ref(''),category=ref(''),stockFilter=ref(''),sort=ref('latest'),page=ref(1);return {query,category,stockFilter,sort,page}})
