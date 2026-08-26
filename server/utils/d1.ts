import type { H3Event } from 'h3'
type Statement={sql:string;params?:unknown[]}
type D1Result<T>={results:T[];success:boolean;meta?:Record<string,unknown>;error?:string}
export const hasD1=(event:H3Event)=>{const c=useRuntimeConfig(event).cloudflare;return Boolean(c.accountId&&c.d1DatabaseId&&c.apiToken)}
async function request<T>(event:H3Event,body:Statement|Statement[]):Promise<D1Result<T>[]> {
 const c=useRuntimeConfig(event).cloudflare
 if(!c.accountId||!c.d1DatabaseId||!c.apiToken) throw createError({statusCode:503,statusMessage:'Database belum dikonfigurasi.'})
 const url=`https://api.cloudflare.com/client/v4/accounts/${c.accountId}/d1/database/${c.d1DatabaseId}/query`
 try { const response=await $fetch<{success:boolean;result:D1Result<T>[];errors?:Array<{message:string}>}>(url,{method:'POST',headers:{Authorization:`Bearer ${c.apiToken}`},body,timeout:10000}); if(!response.success||response.result.some(x=>!x.success)) throw new Error(response.errors?.[0]?.message||'D1 query gagal'); return response.result }
 catch(error){console.error('D1 request failed',{message:error instanceof Error?error.message:'Unknown error'});throw createError({statusCode:502,statusMessage:'Layanan database tidak tersedia.'})}
}
export const d1Query=async<T>(event:H3Event,sql:string,params:unknown[]=[])=>(await request<T>(event,{sql,params}))[0]?.results??[]
export const d1First=async<T>(event:H3Event,sql:string,params:unknown[]=[])=>(await d1Query<T>(event,sql,params))[0]??null
export const d1Execute=async(event:H3Event,sql:string,params:unknown[]=[])=>(await request(event,{sql,params}))[0]
export const d1Batch=async(event:H3Event,statements:Statement[])=>request(event,statements)
