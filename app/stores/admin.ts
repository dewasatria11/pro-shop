export const useAdminStore=defineStore('admin',()=>{const profile=ref<{id:string;name:string;email:string}|null>(null);return {profile}})
