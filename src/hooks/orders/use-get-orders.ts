"use client";

import { Buying, Item } from "@/types/items";
import { clientDb } from "@/utils/client-db";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = ({
  enabled = true,
  params: { user_id, status, email, zipcode },
}: {
  enabled?: boolean;
  params: {
    user_id?: string;
    status?: Buying["status"];
    email?: string;
    zipcode?: string;
  };
}) => {
  return useQuery({
    enabled,
    queryKey: ["orders"],
    queryFn: async () => {
      const payload = status
        ? ["status", status]
        : user_id
        ? ["user_id", user_id]
        : email && zipcode
        ? ["email", email, "zipcode", zipcode]
        : null;
      if (!payload) throw new Error("No payload");
      let res = await clientDb
        .from("buying")
        .select("*, items(*)")
        .eq(payload[0], payload[1]);
      if (res.error) throw new Error(res.error.message);
      return res.data as Buying & { items: Item }[];
    },
  });
};
