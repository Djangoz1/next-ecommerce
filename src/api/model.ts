import { ItemMetadata } from "@/types/items";
import { pool } from "@/utils/db";

export const getModelsQuery = async () => {
  try {
    const result = await pool.from("item_model").select();
    return result.data as ItemMetadata["model"][];
  } catch (error) {
    console.log(
      "Error fetching models",
      error instanceof Error ? error.message : error
    );
    throw error;
  }
};
