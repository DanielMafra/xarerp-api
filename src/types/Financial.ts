export type Financial = {
  id: string;
  type: number;
  unity: string;
  user: string;
  value: number;
}

export type UpdateFinancial = {
  type?: number;
  unity_id?: string;
  value?: number;
}
