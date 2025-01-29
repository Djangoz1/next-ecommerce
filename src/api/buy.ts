import { Buying, Item } from "@/types/items";
import { pool } from "@/utils/db";

export const getBuyingByStripeIdQuery = async (id: string) => {
  try {
    const res = await pool
      .from("buying")
      .select("*, items(*)")
      .eq("stripe_id", id);
    if (res.error) throw new Error(res.error.message);

    return res.data as (Buying & { items: Item })[];
  } catch (error) {
    console.error("Error fetching items", error);
    throw error;
  }
};

export const updateBuyingQuery = async ({ id, ...data }: Buying) => {
  try {
    const result = await pool
      .from("buying")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    if (result.error) throw new Error(result.error.message);

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
    user_id: string;
    stripe_id: string;
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
        user_id: data.user_id,
        stripe_id: data.stripe_id,

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
