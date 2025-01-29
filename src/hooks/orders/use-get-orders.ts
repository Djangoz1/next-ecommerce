"use client";

import { BaseHookResult } from "@/types/app";
import { Address } from "@/types/customer";
import { Buying, Item } from "@/types/items";
import { clientDb } from "@/utils/client-db";
import { useQuery } from "@tanstack/react-query";

export type GetOrdersHook = BaseHookResult<typeof useGetOrders>;

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

      let res =
        email && zipcode
          ? await clientDb
              .from("buying")
              .select("*, items(*)")
              .eq("email", email)
              .eq("zipcode", zipcode)
          : payload
          ? await clientDb
              .from("buying")
              .select("*, items(*)")
              .eq(payload[0], payload[1])
          : await clientDb.from("buying").select("*, items(*)");

      console.log({ res });
      if (res.error) throw new Error(res.error.message);
      const { data: address, ...rest } = await clientDb
        .from("addresses")
        .select(`*`)
        .eq("id", res.data[0].address_id)
        .maybeSingle();

      console.log({ restsrqjrskjqsrj: rest });

      return formatBuying({
        data: res.data as (Buying & {
          items: Item;
          status: Buying["status"];
        })[],
        address: address as Address,
      });
    },
  });
};

export const formatBuying = ({
  data,
  address,
}: {
  data: (Buying & {
    items: Item;
    status: Buying["status"];
    stripe_id: string;
  })[];
  address: Address;
}) => {
  const result = data.reduce(
    (
      acc: Record<
        string,
        {
          items: Omit<
            Buying & { items: Item & { quantity: number } },
            "stripe_id"
          >[];

          stripe_id: string;
          price: number;
          status: Buying["status"];
          address: Address;
        }
      >,
      { stripe_id, ...el }
    ) => {
      if (!acc[stripe_id]) {
        acc[stripe_id] = {
          items: [],

          stripe_id,

          status: el.status,
          price: 0,
          address: address,
        };
      }
      const index = acc[stripe_id].items.findIndex(
        (item) => item.items.id === el.item_id && item.size === el.size
      );
      if (index !== -1) {
        acc[stripe_id].items[index].items.quantity++;
      } else {
        acc[stripe_id].items.push({
          ...el,
          items: { ...el.items, quantity: 1 },
        });
      }

      if (acc[stripe_id].status === "paid") {
        acc[stripe_id].status = el.status;
      }

      acc[stripe_id].price += Number(el.items.price);

      return acc;
    },
    {} as Record<
      string,
      {
        items: Omit<
          Buying & {
            items: Item & { quantity: number };
          },
          "stripe_id"
        >[];
        stripe_id: string;
        price: number;
        status: Buying["status"];
        address: Address;
      }
    >
  );
  return Object.values(result);
};
