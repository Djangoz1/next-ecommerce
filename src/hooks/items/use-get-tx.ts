"use client";
import { Item } from "@/types/items";
import { useMemo } from "react";

export const useGetTx = ({
  items,
}: {
  items: (Item & { quantity: number })[] | undefined;
}) => {
  return useMemo(() => {
    if (!items) return undefined;
    const total = items.reduce(
      (acc: { net: number; brut: number }, item) => {
        const price = Number(item.price) * item.quantity;
        acc.brut += price;
        acc.net += price - (price * (item.discount || 0)) / 100;
        return acc;
      },
      { net: 0, brut: 0 }
    );

    const shipping = total.net > 250 ? 0 : 25;
    total.brut += 25;

    return {
      ...total,
      shipping,
      total: total.net + shipping,
      taxes: 20,
    };
  }, [items]);
};
