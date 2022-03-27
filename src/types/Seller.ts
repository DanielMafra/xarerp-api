export type Seller = {
  id: string;
  user: string;
  comission: number;
}

export type UpdateSeller = {
  user_id?: string;
  comission?: number;
}
