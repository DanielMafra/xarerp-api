export type Purchase = {
  id: string;
  user: string;
  unity: string;
  provider: string;
  product: string;
  quantity: number;
  unit_price: number;
  status: number;
}

export type UpdatePurchase = {
  unity_id?: string;
  provider_id?: string;
  product_id?: string;
  quantity?: number;
  unit_price?: number;
  status?: number;
}
