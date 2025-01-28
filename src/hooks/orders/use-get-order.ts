"use client";

import { Buying, Item } from "@/types/items";
import { clientDb } from "@/utils/client-db";
import { useQuery } from "@tanstack/react-query";

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
    queryKey: ["orders"],
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
      const castArr = arr.reduce(
        (acc: (Buying & { items: Item })[][], item) => {
          const existingGroup = acc.find((group) => group[0]?.id === item.id);

          if (existingGroup) {
            existingGroup.push(item);
            return acc;
          }
          return [...acc, [item]];
        },
        []
      );
      return {
        items: castArr,
        customer: {
          name: user.user_metadata.name,
          email: user.email,
          phone: user.user_metadata.phone,
          address: user.user_metadata.address,
          zipcode: user.user_metadata.zipcode,
          city: user.user_metadata.city,
        },
      };
    },
  });
};
