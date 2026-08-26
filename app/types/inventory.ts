export type MovementType='IN'|'OUT'|'ADJUSTMENT_IN'|'ADJUSTMENT_OUT'
export interface Movement { id:string; productId:string; productName:string; sku:string; categoryName:string; movementType:MovementType; quantity:number; beforeStock:number; afterStock:number; reference?:string; counterparty?:string; note?:string; movementAt:string; adminName:string }
