import { requireAdmin } from '../utils/auth';import { assertSameOrigin } from '../utils/security'
export default defineEventHandler(async event=>{if(!event.path.startsWith('/api/admin/'))return;if(!['GET','HEAD'].includes(event.method)){assertSameOrigin(event)}event.context.admin=await requireAdmin(event)})
