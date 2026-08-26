export interface Category { id:string; name:string; slug:string; description?:string; sortOrder?:number; isActive?:boolean }
export interface ProductImage { id?:string; url:string; alt:string; storageKey?:string; isCover?:boolean; sortOrder?:number }
export interface Product { id:string; categoryId?:string; sku:string; name:string; slug:string; shortDescription:string; description:string; price:number; stock:number; lowStockThreshold:number; specifications:Record<string,string>; isFeatured:boolean; isActive:boolean; category:Category; coverImage:ProductImage; images?:ProductImage[]; createdAt?:string; updatedAt?:string }
export interface PaginatedProducts { data:Product[]; meta:{page:number;limit:number;total:number;totalPages:number} }
