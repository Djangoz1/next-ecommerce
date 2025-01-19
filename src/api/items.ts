import { pool } from "@/utils/db";

export const getAllItemsQuery = async () => {
  try {
    const res = await pool.query("SELECT * FROM items");
    return res.rows;
  } catch (error) {
    console.error("Error fetching items", error);
    throw error;
  }
};

export const getItemByTypeQuery = async (type: string) => {
  try {
    const res = await pool.query("SELECT * FROM items WHERE type = $1", [type]);
    return res.rows;
  } catch (error) {
    console.error("Error fetching items by type", error);
    throw error;
  }
};

export const getItemByIdQuery = async (id: number) => {
  try {
    if (id === undefined) {
      throw new Error("Item id is required");
    }
    const res = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    return res.rows[0];
  } catch (error) {
    console.error("Error fetching item by id", error);
    throw error;
  }
};

export const getItemMetadataByIdQuery = async (id: number) => {
  try {
    const [metadata, model] = await Promise.all([
      pool.query(`SELECT * FROM item_details WHERE item_id = $1`, [id]),
      pool.query(`SELECT * FROM item_model WHERE item_id = $1`, [id]),
    ]);
    return {
      ...metadata.rows.reduce((acc, item) => {
        acc[item.type] = item;
        return acc;
      }, {}),
      model: model.rows?.[0],
    } as Record<
      "details" | "compo" | "care" | "traceability" | "engagements",
      {
        id: number;
        item_id: number;
        title: string;
        content: string[];
      }
    > & {
      model: {
        id: number;
        item_id: number;
        name: string;
        regular: boolean;
        size: number;
        tall: number;
        dimension: number;
        centimeters_by_size: number;
      };
    };
  } catch (error) {
    console.error("Error fetching item metadata by id", error);
    throw error;
  }
};

export const updateMetadataQuery = async (
  id: number,
  metadata: any,
  type: "details" | "compo" | "care" | "traceability" | "engagements" | "model"
) => {
  try {
    if (type === "model") {
      if (
        !metadata.name ||
        !metadata.regular ||
        !metadata.size ||
        !metadata.tall ||
        !metadata.dimension ||
        !metadata.centimeters_by_size
      ) {
        throw new Error("Missing metadata");
      }
      const query = `UPDATE item_model SET name = $1, regular = $2, size = $3, tall = $4, dimension = $5, centimeters_by_size = $6 WHERE item_id = $7 RETURNING *`;
      const values = [
        metadata.name,
        metadata.regular,
        metadata.size,
        metadata.tall,
        metadata.dimension,
        metadata.centimeters_by_size,
        id,
      ];
      const result = await pool.query(query, values);
      return result.rows;
    }

    const query = `UPDATE item_details SET title = $1, content = $2 WHERE item_id = $3 AND type = $4 RETURNING *`;
    const values = [metadata.title || null, metadata.content, id, type];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error updating metadata", error);
    throw error;
  }
};

export const createMetadataQuery = async (
  item_id: number,
  metadata: any,
  type: "details" | "compo" | "care" | "traceability" | "engagements" | "model"
) => {
  try {
    if (!item_id) {
      throw new Error("Item id is required");
    }
    if (type === "model") {
      if (
        !!!metadata.name ||
        !!!metadata.regular ||
        !!!metadata.size ||
        !!!metadata.tall ||
        !!!metadata.dimension ||
        !!!metadata.centimeters_by_size
      ) {
        throw new Error("Missing metadata");
      }
      const query = `INSERT INTO item_model (item_id, name, regular, size, tall, dimension, centimeters_by_size) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = [
        item_id,
        metadata.name,
        metadata.regular,
        metadata.size,
        metadata.tall,
        metadata.dimension,
        metadata.centimeters_by_size,
      ];
      const result = await pool.query(query, values);
      return result.rows[0];
    }

    if (!metadata.content) {
      throw new Error("Content is required");
    }
    if (
      !["details", "compo", "care", "traceability", "engagements"].includes(
        type
      )
    ) {
      throw new Error("Type is required");
    }

    const query = `INSERT INTO item_details (item_id, title, content, type) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [item_id, metadata.title || null, metadata.content, type];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating metadata", error);
    throw error;
  }
};
