"use client";
import { BaseHookResult } from "@/types/app";
import { Item } from "@/types/items";
import { clientDb } from "@/utils/client-db";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type PendingItem = BaseHookResult<typeof usePendingItems>;

export const usePendingItems = () => {
  const client = useQueryClient();
  return {
    ...useQuery({
      queryKey: ["pending-items"],
      queryFn: async () => {
        const arr = JSON.parse(
          localStorage.getItem("pending-items") || "[]"
        ) as {
          id: number;
          size: string;
        }[];

        if (arr.length === 0) return [];
        const result = await clientDb
          .from("items")
          .select("*")
          .in(
            "id",
            arr.map((item) => item.id)
          );

        const items: (Item & { size: string; quantity: number })[] = [];
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          const findIndex = items.findIndex(
            (item) => item.id == element.id && item.size === element.size
          );
          const item = result.data?.find((item) => item.id == element.id);
          if (findIndex === -1) {
            items.push({
              ...element,
              quantity: 1,
              ...item,
            });
          } else {
            items[findIndex].quantity += 1;
          }
        }
        return items;
      },
    }),
    clear: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("pending-items");
        client.invalidateQueries({
          queryKey: ["pending-items"],
        });
      }
    },
  };
};
