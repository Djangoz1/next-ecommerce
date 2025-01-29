export type Address = {
  id: number;
  user_id: number;
  address: string;
  city: string;
  zipcode: string;
  detail: string | null;
  company: string | null;
  first_name: string;
  last_name: string;
  province: string;
  default: boolean;
  country: string;
};
