"use client";

import { BaseHookParams, BaseHookResult } from "@/types/app";
import { Item, ItemMetadata } from "@/types/items";
import { clientDb } from "@/utils/client-db";
import { useQuery } from "@tanstack/react-query";

export type GetItemDetailsHook = BaseHookResult<typeof useGetItemDetails>;

export const useGetItemDetails = <T extends keyof ItemMetadata>({
  enabled = true,
  params: { id, type },
  filters: { limit = 1 } = {},
}: BaseHookParams & { params: { id?: Item["id"]; type: T } }) => {
  return useQuery({
    enabled,
    queryKey: ["item-details", id, type],
    queryFn: async () => {
      if (!type) throw new Error("Item type is required");
      const { data, error } = id
        ? await clientDb
            .from("item_details")
            .select("*")
            .eq("item_id", id)
            .eq("type", type)
            .limit(limit)
        : await clientDb
            .from("item_details")
            .select("*")
            .eq("type", type)
            .limit(limit);
      if (error) throw new Error(error.message);

      return data as ItemMetadata[T][];
    },
  });
};
