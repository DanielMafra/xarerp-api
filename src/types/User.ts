export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  unity: string;
  position: string;
  permissions: string;
  active: boolean;
}

export type UpdateUser = {
  name?: string;
  email?: string;
  password?: string;
  unity_id?: string;
  position?: string;
  permissions?: string;
  active?: boolean;
}
