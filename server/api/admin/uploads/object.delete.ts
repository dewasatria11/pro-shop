import { z } from 'zod';import { deleteObject } from '../../../utils/r2';import { parseBody } from '../../../utils/security'
export default defineEventHandler(async event=>{const {key}=parseBody<{key:string}>(z.object({key:z.string().startsWith('products/').max(300)}),await readBody(event));await deleteObject(event,key);return {data:{success:true}}})
