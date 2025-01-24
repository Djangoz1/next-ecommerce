import { pool } from "../utils/db";

export const getItemImagesQuery = async (id: number) => {
  try {
    if (id === undefined) {
      throw new Error("Room id is required");
    }
    const res = await pool.from("gallery").select().eq("item_id", id);

    return (await Promise.all(
      (res.data || [])?.map(async (image) => {
        const imageData = await pool
          .from("item_images")
          .select()
          .eq("id", image.image_id);
        return imageData.data?.[0];
      })
    )) as {
      id: number;
      item_id: number;
      image_id: number;
    }[];
  } catch (error) {
    console.error("Error fetching item images", error);
    throw error;
  }
};

export const getGalleryQuery = async () => {
  try {
    const res = await pool.from("gallery").select();
    return res.data;
  } catch (error) {
    console.error("Error fetching gallery", error);
    throw error;
  }
};
