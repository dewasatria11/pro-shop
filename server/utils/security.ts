import type { H3Event } from 'h3'
export function assertSameOrigin(event:H3Event){const origin=getHeader(event,'origin');const host=getHeader(event,'host');if(origin&&host&&new URL(origin).host!==host)throw createError({statusCode:403,statusMessage:'Permintaan lintas origin ditolak.'})}
export function parseBody<T>(schema:{safeParse:(v:unknown)=>any},value:unknown):T{const result=schema.safeParse(value);if(!result.success)throw createError({statusCode:422,statusMessage:'Data tidak valid.',data:{fieldErrors:result.error.flatten().fieldErrors}});return result.data}
