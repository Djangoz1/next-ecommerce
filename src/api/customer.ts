import { Customer } from "@/types/items";
import { pool } from "@/utils/db";

export const createCustomer = async (body: {
  email: string;
  name: string;
  phone: string;
  address: string;
  zipcode: string;
  city: string;
}) => {
  if (!body.email) throw new Error("Email not found");
  if (!body.name) throw new Error("Name not found");
  if (!body.phone) throw new Error("Phone not found");
  if (!body.address) throw new Error("Address not found");
  if (!body.zipcode) throw new Error("Zip code not found");
  if (!body.city) throw new Error("City not found");

  const customer = await pool
    .from("customers")
    .insert({
      email: body.email,
      name: body.name,
      phone: body.phone,
      address: body.address,
      zipcode: body.zipcode,
      city: body.city,
    })
    .select()
    .single();

  return customer.data as Customer;
};

export const getCustomerByIdQuery = async (id: number) => {
  const customer = await pool.from("customers").select().eq("id", id).single();
  return customer.data as Customer;
};
