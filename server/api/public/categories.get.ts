import { d1Query,hasD1 } from '../../utils/d1';import { demoCategories } from '../../utils/demo'
export default defineEventHandler(async event=>({data:hasD1(event)?await d1Query(event,"SELECT id,name,slug,description,sort_order sortOrder FROM categories WHERE deleted_at IS NULL AND is_active=1 ORDER BY sort_order,name"):demoCategories}))
