import { destroySession } from '../../utils/auth';import { assertSameOrigin } from '../../utils/security'
export default defineEventHandler(async event=>{assertSameOrigin(event);await destroySession(event);return {data:{success:true}}})
