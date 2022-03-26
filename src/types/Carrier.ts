export type Carrier = {
  id: string;
  name: string;
  region: string;
}

export type UpdateCarrier = {
  name?: string;
  region?: string;
}
