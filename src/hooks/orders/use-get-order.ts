"use client";

import { BaseHookResult } from "@/types/app";
import { Address } from "@/types/customer";
import { Buying, Item } from "@/types/items";
import { clientDb } from "@/utils/client-db";
import { useQuery } from "@tanstack/react-query";
export type GetOrderHook = BaseHookResult<typeof useGetOrder>;
export const useGetOrder = ({
  enabled = true,
  params: { stripe_id },
}: {
  enabled?: boolean;
  params: {
    stripe_id?: string;
  };
}) => {
  return useQuery({
    enabled,
    queryKey: ["order", stripe_id],
    queryFn: async () => {
      const userRes = await clientDb.auth.getUser();
      const user = userRes.data.user;
      if (!user) throw new Error("User not found");
      const { data, error } = await clientDb
        .from("buying")
        .select("*, items(*)")
        .eq("stripe_id", stripe_id);
      const arr = data as (Buying & { items: Item })[];
      if (error) throw new Error(error.message);
      if (!arr.length) throw new Error("No items found");

      const { data: addresses, ...rest } = await clientDb
        .from("addresses")
        .select("*")
        .eq("id", arr[0].address_id)
        .single();

      const castArr = Object.values(
        arr.reduce(
          (
            acc: Record<string, Buying & { items: Item; quantity: number }>,
            item
          ) => {
            const key = `${item.item_id}-${item.size}`;

            if (acc[key]) {
              acc[key].quantity++;
            } else {
              acc[key] = { ...item, quantity: 1 };
            }

            return acc;
          },
          {} as Record<string, Buying & { items: Item; quantity: number }>
        )
      );
      return { items: castArr, address: addresses as Address };
    },
  });
};
