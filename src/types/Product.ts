export type Product = {
  id: string;
  name: string;
  description: string;
  purchase_price: number;
  sale_price: number;
  category: string;
  unity: string;
  provider: string;
  user: string;
  lot: number;
  validity: Date;
  quantity: number;
}

export type UpdateProduct = {
  name?: string;
  description?: string;
  purchase_price?: number;
  sale_price?: number;
  category_id?: string;
  unity_id?: string;
  provider_id?: string;
  lot: number;
  validity: Date;
  quantity: number;
}
