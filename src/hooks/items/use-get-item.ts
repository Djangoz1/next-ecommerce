"use client";

import { BaseHookParams, BaseHookResult } from "@/types/app";
import { Item, ItemMetadata } from "@/types/items";
import { clientDb } from "@/utils/client-db";
import { useQuery } from "@tanstack/react-query";

export type GetItemHook = BaseHookResult<typeof useGetItem>;

export const useGetItem = ({
  enabled = true,
  params: { id },
}: BaseHookParams & { params: { id?: Item["id"] } }) => {
  return useQuery({
    enabled: enabled && !!id,
    queryKey: ["item", id],
    queryFn: async () => {
      if (!id) throw new Error("Item id is required");
      const [item, gallery, metadata] = await Promise.all([
        getItemByIdQuery(Number(id)),
        getItemImagesQuery(Number(id)),
        getItemMetadataByIdQuery(Number(id)),
      ]);

      return {
        ...item,
        gallery,
        metadata,
      };
    },
  });
};

const getItemByIdQuery = async (id: number) => {
  try {
    if (id === undefined) {
      throw new Error("Item id is required");
    }
    const res = await clientDb.from("items").select("*").eq("id", id).single();

    return res.data as Item;
  } catch (error) {
    console.error("Error fetching item by id", error);
    throw error;
  }
};

const getItemImagesQuery = async (id: number) => {
  try {
    if (id === undefined) {
      throw new Error("Room id is required");
    }
    const res = await clientDb.from("gallery").select().eq("item_id", id);

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

const getItemMetadataByIdQuery = async (id: number) => {
  try {
    const [metadata, model] = await Promise.all([
      clientDb.from("item_details").select("*").eq("item_id", id),
      clientDb.from("item_model").select("*").eq("item_id", id),
    ]);
    return {
      ...(metadata.data || [])?.reduce((acc, item) => {
        acc[item.type] = item;
        return acc;
      }, {}),
      model: model.data?.[0],
    } as Record<
      keyof ItemMetadata,
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
