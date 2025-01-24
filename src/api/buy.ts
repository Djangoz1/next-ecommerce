import { Buying, Item } from "@/types/items";
import { pool } from "@/utils/db";

export const getAllItemsQuery = async (client_id: string) => {
  try {
    const res = await pool
      .from("buying")
      .select("*")
      .eq("client_id", client_id);
    return res.data as Buying[];
  } catch (error) {
    console.error("Error fetching items", error);
    throw error;
  }
};

export const getBuyingByIdQuery = async (id: number) => {
  try {
    const res = await pool.from("buying").select("*").eq("id", id).single();
    return res.data as Buying;
  } catch (error) {
    console.error("Error fetching items", error);
    throw error;
  }
};

export const getBuyingByStripeIdQuery = async (id: string) => {
  try {
    const res = await pool.from("buying").select("*").eq("stripe_id", id);
    console.log("all", await pool.from("buying").select("*"));
    console.log({ res });
    return res.data as Buying[];
  } catch (error) {
    console.error("Error fetching items", error);
    throw error;
  }
};

export const updateBuyingQuery = async ({
  data: { id, ...data },
}: {
  data: Buying;
}) => {
  try {
    const result = await pool
      .from("buying")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    return result.data as Buying;
  } catch (error) {
    console.error("Error updating metadata", error);
    throw error;
  }
};

export const createBuyingQuery = async (
  item: { id: number },
  data: {
    size: string;
    customer_id: number;
    stripe_id: string;
    created_at: string;
    buying_at: string;
    status: Buying["status"];
  }
) => {
  try {
    const result = await pool
      .from("buying")
      .insert({
        item_id: item.id,
        size: data.size,
        status: "pending",
        customer_id: data.customer_id,
        stripe_id: data.stripe_id,
        created_at: data.created_at,
        buying_at: data.buying_at,
        message: "test",
      })
      .select()
      .single();

    return result.data as Buying;
  } catch (error) {
    console.error("Error updating metadata", error);
    throw error;
  }
};
