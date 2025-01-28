"use client";

import { BaseHookParams } from "@/types/app";
import { Item } from "@/types/items";
import { clientDb } from "@/utils/client-db";
import { useQuery } from "@tanstack/react-query";

export const useGetItems = ({
  enabled = true,
  params: { type },
}: BaseHookParams & { params: { type?: Item["type"] } }) => {
  return useQuery({
    enabled,
    queryKey: ["items", type],
    queryFn: async () => {
      const userRes = await clientDb.auth.getUser();
      const user = userRes.data.user;
      if (!user) throw new Error("User not found");
      const { data, error } = type
        ? await clientDb.from("items").select("*").eq("type", type)
        : await clientDb.from("items").select("*");
      if (error) throw new Error(error.message);

      return data as Item[];
    },
  });
};
