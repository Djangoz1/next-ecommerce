import { pool } from "../utils/db";

export const getItemImagesQuery = async (id: number) => {
  try {
    if (id === undefined) {
      throw new Error("Room id is required");
    }
    const res = await pool.query("SELECT * FROM gallery WHERE item_id = $1", [
      id,
    ]);
    const images = res.rows.map(async (image) => {
      const imageData = await pool.query(
        "SELECT * FROM item_images WHERE id = $1",
        [image.image_id]
      );
      return imageData.rows[0];
    });
    return await Promise.all(images);
  } catch (error) {
    console.error("Error fetching item images", error);
    throw error;
  }
};

export const getGalleryQuery = async () => {
  try {
    const res = await pool.query("SELECT * FROM item_images");
    return res.rows;
  } catch (error) {
    console.error("Error fetching gallery", error);
    throw error;
  }
};
