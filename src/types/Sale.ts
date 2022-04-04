export type Sale = {
  id: string;
  product: string;
  unity: string;
  client: string;
  seller: string;
  carrier: string;
  quantity: number;
  status: number;
}

export type UpdateSale = {
  product_id?: string;
  unity_id?: string;
  client_id?: string;
  seller_id?: string;
  carrier_id?: string;
  quantity?: number;
  status?: number;
}
