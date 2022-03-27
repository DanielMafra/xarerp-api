export type Ticket = {
  id: string;
  title: string;
  description: string;
  unity: string;
  user: string;
  status: number;
}

export type UpdateTicket = {
  title?: string;
  description?: string;
  unity_id?: string;
  status?: number;
}
