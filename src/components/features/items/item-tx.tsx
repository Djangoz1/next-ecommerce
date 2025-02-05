"use client";
import { Title } from "@/components/ui/typography/title";
import { useGetTx } from "@/hooks/items/use-get-tx";
import { cn } from "@/utils/cn";
import React from "react";

type ItemTxProps = {
  tx: ReturnType<typeof useGetTx>;

  coupon:
    | {
        percent_off: number;
        amount_off: number;
      }
    | undefined;
  className?: string;
};
export const ItemTx = ({ tx, coupon, className = "" }: ItemTxProps) => {
  console.log({ tx, coupon });
  return (
    <div className={cn("flex flex-col  w-full gap-2", className)}>
      <Title className="text-lg">Facture</Title>
      {[
        {
          title: "Expédition",
          value:
            tx?.shipping && tx?.total < 250
              ? `${tx?.shipping?.toFixed(2)}€`
              : "Gratuit",
        },
        {
          title: "Sous-total",
          value: `${tx?.brut?.toFixed(2)} €`,
        },
        {
          title: "Promotion",
          value: `${(coupon?.percent_off
            ? (Number(tx?.brut || 0) * coupon.percent_off) / 100
            : coupon?.amount_off || (tx?.total || 0) - (tx?.brut || 0)
          ).toFixed(2)} €`,
        },
        {
          title: <b className=" text-2xl">Total</b>,
          value: (
            <>
              <span className="font-medium text-muted-foreground text-sm mr-1 mt-auto">
                EUR
              </span>
              <span className="font-semibold text-xl text-black">
                {tx?.total?.toFixed(2)} €
              </span>
            </>
          ),
        },
      ].map((item, i) => (
        <div
          key={`tx-ordrer-${i}`}
          className="flex justify-between  items-end gap-5 w-full"
        >
          <h6 className="text-xs font-medium w-32">{item.title}</h6>
          <p className="text-muted-foreground w-24 whitespace-nowrap text-end font-semibold uppercase text-xs">
            {item.value}
          </p>
        </div>
      ))}
      <p className="font-medium text-muted-foreground text-xs ml-auto">
        Taxe {tx?.taxes} €
      </p>
    </div>
  );
};
