import { createHash,randomBytes,timingSafeEqual } from 'node:crypto'
import bcrypt from 'bcryptjs'
import type { H3Event } from 'h3'
import { d1Execute,d1First,hasD1 } from './d1'
export const hashToken=(token:string)=>createHash('sha256').update(token).digest('hex')
export const verifyHash=(token:string,hash:string)=>{const a=Buffer.from(hashToken(token));const b=Buffer.from(hash);return a.length===b.length&&timingSafeEqual(a,b)}
export async function createSession(event:H3Event,userId:string){const token=randomBytes(32).toString('base64url');const expires=new Date(Date.now()+7*864e5);await d1Execute(event,'INSERT INTO admin_sessions (id,admin_user_id,token_hash,expires_at) VALUES (?,?,?,?)',[crypto.randomUUID(),userId,hashToken(token),expires.toISOString()]);const cfg=useRuntimeConfig(event);setCookie(event,cfg.session.cookieName,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:7*86400});return token}
export async function getAdmin(event:H3Event){if(!hasD1(event)) return null;const cfg=useRuntimeConfig(event);const token=getCookie(event,cfg.session.cookieName);if(!token)return null;return d1First<{id:string;name:string;email:string}>(event,`SELECT u.id,u.name,u.email FROM admin_sessions s JOIN admin_users u ON u.id=s.admin_user_id WHERE s.token_hash=? AND s.expires_at>datetime('now') AND u.is_active=1`,[hashToken(token)])}
export async function requireAdmin(event:H3Event){const admin=await getAdmin(event);if(!admin)throw createError({statusCode:401,statusMessage:'Silakan masuk sebagai admin.'});return admin}
export const verifyPassword=(value:string,hash:string)=>bcrypt.compare(value,hash)
export async function destroySession(event:H3Event){const cfg=useRuntimeConfig(event);const token=getCookie(event,cfg.session.cookieName);if(token&&hasD1(event))await d1Execute(event,'DELETE FROM admin_sessions WHERE token_hash=?',[hashToken(token)]);deleteCookie(event,cfg.session.cookieName,{path:'/'})}
