"use client";

import { useSession } from "@/context/app";
import { BaseHookParams, BaseHookResult } from "@/types/app";
import { Address } from "@/types/customer";

import { clientDb } from "@/utils/client-db";
import { useQuery } from "@tanstack/react-query";
import { useAsyncApi } from "../useAsyncApi";

export type GetAddressesHook = BaseHookResult<typeof useAddresses>;

export const useAddresses = ({
  enabled = true,
  params: { address_id },
}: BaseHookParams & { params: { address_id?: Address["id"] } }) => {
  const { user } = useSession();

  const { mutateAsync, ...asyncResult } = useAsyncApi({});
  const keys = ["addresses", user?.id as string, `${address_id}`];
  return {
    ...useQuery({
      enabled: enabled && !!user?.id,
      queryKey: keys,
      queryFn: async () => {
        if (!user?.id) throw new Error("Required user id");
        const { data, error } = address_id
          ? await clientDb.from("addresses").select("*").eq("id", address_id)
          : await clientDb.from("addresses").select("*").eq("user_id", user.id);

        if (error) throw new Error(error.message);

        return data as Address[];
      },
    }),
    asyncResult,
    execute: async ({
      method = "POST",
      ...params
    }:
      | {
          method?: "POST" | "PUT";
          zipcode: string;
          city: string;
          country: string;
          province: string;
          address: string;
          id?: Address["id"];
          company?: string;
          default?: boolean;
          detail?: string;
        }
      | { method: "DELETE"; id: Address["id"] }) => {
      if (!user) return;

      if (method === "DELETE") {
        if (!params.id) throw new Error("Required id for DELETE method");
        const res = await mutateAsync({
          path: `/account/address/${params?.id}`,
          method: "DELETE",
          params: {},
          invalidateQueries: [keys],
        });
        return res;
      }
      const _address_id = params?.id || address_id;
      if (method === "PUT" && !_address_id)
        throw new Error("Required address id for PUT method");

      let res = await mutateAsync({
        params: {
          ...params,
          user_id: user.id,
        },
        ...(method === "PUT"
          ? {
              path: `/account/address/${_address_id}`,
              toast: {
                title: "Adresse modifiée",
                description: "L'adresse a été modifiée avec succès",
              },
            }
          : {
              path: `/account/address`,
              toast: {
                title: "Adresse ajoutée",
                description: "L'adresse a été ajoutée avec succès",
              },
            }),

        method,
        invalidateQueries: [keys, ["addresses"]],
      });

      return res;
    },
  };
};
