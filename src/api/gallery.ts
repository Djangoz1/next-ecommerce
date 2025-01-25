import { pool } from "../utils/db";

export const getItemImagesQuery = async (id: number) => {
  try {
    if (id === undefined) {
      throw new Error("Room id is required");
    }
    const res = await pool.from("gallery").select().eq("item_id", id);

    return res.data as {
      id: number;
      item_id: number;
      image: string;
    }[];
  } catch (error) {
    console.error("Error fetching item images", error);
    throw error;
  }
};
