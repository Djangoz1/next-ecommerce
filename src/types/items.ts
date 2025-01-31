import { Address } from "./customer";

type BaseMetadata = {
  title: string | null;
  content: string[];
};

export type ItemMetadata = {
  care: BaseMetadata;
  compo: BaseMetadata;
  details: BaseMetadata;
  traceability: BaseMetadata;
  engagements: BaseMetadata;
  model: {
    dimension: number;
    tall: number;
    centimeters_by_size: number;
    regular: boolean;
    size: number;
    name: string;
  };
};

export type Item = {
  abstract_description: string;
  description: string;
  discount: number;
  id: number;
  main_image: string;
  price: string;
  stock: number;
  name: string;
  type: "dress" | "miniature" | "painting";
};

export type Buying = {
  id: number;
  item_id: number;
  stripe_id: string;
  size: string;
  address_id: Address["id"];
  message: string | null;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  buying_at: string | null;
  tracking: string | null;
  user_id: string;
};

export type BuyingApi = {
  items: Array<
    Buying & {
      items: Item & {
        quantity: number;
      };
    }
  >;
  customers: Customer;
  stripe_id: string;
  price: number;
  status: Buying["status"];
};

export type Customer = {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  zipcode: string;
  city: string;
};

export type Newsletter = {
  id: number;
  email: string;
  created_at: string;
};
