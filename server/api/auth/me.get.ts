import { getAdmin } from '../../utils/auth'
export default defineEventHandler(async event=>{const admin=await getAdmin(event);if(!admin)throw createError({statusCode:401,statusMessage:'Belum masuk.'});return {data:admin}})
