"use client";

import { useSession } from "@/context/app";
import { BaseHookParams, BaseHookResult } from "@/types/app";
import { Newsletter } from "@/types/items";
import { clientDb } from "@/utils/client-db";
import { useQuery } from "@tanstack/react-query";

export type GetNewsletterHook = BaseHookResult<typeof useNewsletter>;

export const useNewsletter = ({
  enabled = true,
  params: {},
}: BaseHookParams & { params: {} }) => {
  const { user } = useSession();
  return useQuery({
    enabled: enabled && !!user?.email,
    queryKey: ["newsletter", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error("Required user email");
      const { data, error } = await clientDb
        .from("newsletter")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (error) throw new Error(error.message);

      return data as Newsletter;
    },
  });
};
