export type Seller = {
  id: string;
  user: string;
  commission: number;
}

export type UpdateSeller = {
  user_id?: string;
  commission?: number;
}
