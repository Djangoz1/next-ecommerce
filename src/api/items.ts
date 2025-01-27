import { Item, ItemMetadata } from "@/types/items";
import { pool } from "@/utils/db";

export const getAllItemsQuery = async () => {
  try {
    const res = await pool.from("items").select("*");
    return res.data as Item[];
  } catch (error) {
    console.error("Error fetching items", error);
    throw error;
  }
};

export const getItemByTypeQuery = async (type: string) => {
  try {
    const res = await pool.from("items").select("*").eq("type", type);

    return res.data as Item[];
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
    const res = await pool.from("items").select("*").eq("id", id).single();

    return res.data as Item;
  } catch (error) {
    console.error("Error fetching item by id", error);
    throw error;
  }
};

export const updateItemQuery = async (item: Partial<Item>) => {
  try {
    const res = await pool
      .from("items")
      .update(item)
      .eq("id", item.id)
      .select()
      .single();
    return res.data as Item;
  } catch (error) {
    console.error("Error updating item", error);
    throw error;
  }
};

export const getItemMetadataByIdQuery = async (id: number) => {
  try {
    const [metadata, model] = await Promise.all([
      pool.from("item_details").select("*").eq("item_id", id),
      pool.from("item_model").select("*").eq("item_id", id),
    ]);
    return {
      ...(metadata.data || [])?.reduce((acc, item) => {
        acc[item.type] = item;
        return acc;
      }, {}),
      model: model.data?.[0],
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

export const updateMetadataQuery = async <T extends keyof ItemMetadata>(
  id: number,
  metadata: ItemMetadata[T],
  type: T
) => {
  try {
    if (type === "model") {
      const modelMetadata = metadata as ItemMetadata["model"];
      if (
        !modelMetadata.name ||
        !modelMetadata.regular ||
        !modelMetadata.size ||
        !modelMetadata.tall ||
        !modelMetadata.dimension ||
        !modelMetadata.centimeters_by_size
      ) {
        throw new Error("Missing metadata");
      }

      const values = {
        name: modelMetadata.name,
        regular: modelMetadata.regular,
        size: modelMetadata.size,
        tall: modelMetadata.tall,
        dimension: modelMetadata.dimension,
        centimeters_by_size: modelMetadata.centimeters_by_size,
        item_id: id,
      };
      const result = await pool
        .from("item_model")
        .update(values)
        .eq("item_id", id)
        .eq("type", type)
        .select();
      return result.data?.[0];
    }

    const detailsMetadata = metadata as ItemMetadata["details"];

    const values = {
      title: detailsMetadata.title || null,
      content: detailsMetadata.content,
      item_id: id,
      type: type,
    };
    const result = await pool
      .from("item_details")
      .update(values)
      .eq("item_id", id)
      .eq("type", type)
      .select();
    return result.data?.[0] as ItemMetadata;
  } catch (error) {
    console.error("Error updating metadata", error);
    throw error;
  }
};

export const createMetadataQuery = async <T extends keyof ItemMetadata>(
  item_id: number,
  metadata: ItemMetadata[T],
  type: T
) => {
  try {
    if (!item_id) {
      throw new Error("Item id is required");
    }
    if (!type) {
      throw new Error("Type is required");
    }
    if (!metadata) {
      throw new Error(`Metadata is required for ${type}`);
    }
    if (type === "model") {
      const modelMetadata = metadata as ItemMetadata["model"];
      if (
        !modelMetadata.name ||
        !modelMetadata.regular ||
        !modelMetadata.size ||
        !modelMetadata.tall ||
        !modelMetadata.dimension ||
        !modelMetadata.centimeters_by_size
      ) {
        throw new Error("Missing metadata");
      }

      const values = {
        item_id: item_id,
        name: modelMetadata.name,
        regular: modelMetadata.regular,
        size: modelMetadata.size,
        tall: modelMetadata.tall,
        dimension: modelMetadata.dimension,
        centimeters_by_size: modelMetadata.centimeters_by_size,
      };
      const result = await pool.from("item_model").insert(values).select();
      return result.data?.[0];
    }

    const detailsMetadata = metadata as ItemMetadata["details"];
    if (!detailsMetadata.content) {
      throw new Error("Content is required");
    }
    if (
      !["details", "compo", "care", "traceability", "engagements"].includes(
        type
      )
    ) {
      throw new Error("Type is required");
    }

    const values = {
      item_id: item_id,
      title: detailsMetadata.title || null,
      content: detailsMetadata.content,
      type: type,
    };
    const result = await pool.from("item_details").insert(values).select();
    return result.data?.[0] as ItemMetadata;
  } catch (error) {
    console.error("Error updating metadata", error);
    throw error;
  }
};
