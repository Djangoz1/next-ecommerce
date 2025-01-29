export type Address = {
  id: number;
  user_id: number;
  address: string;
  city: string;
  zipcode: string;
  detail: string | null;
  company: string | null;

  province: string;
  default: boolean;
  country: string;
};
