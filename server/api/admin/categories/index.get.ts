import { d1Query } from '../../../utils/d1'
export default defineEventHandler(async event=>({data:await d1Query(event,'SELECT id,name,slug,description,sort_order sortOrder,is_active isActive,updated_at updatedAt FROM categories WHERE deleted_at IS NULL ORDER BY sort_order,name')}))
