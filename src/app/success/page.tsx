"use client";
import { ViewAddress } from "@/components/features/account/view-address";

import { ItemTx } from "@/components/features/items/item-tx";
import { ViewOrderItem } from "@/components/features/items/view-order-item";

import { BoxError } from "@/components/ui/box/box-error";
import { Loader } from "@/components/ui/box/loader";
import { Btn } from "@/components/ui/btn";
import { Title } from "@/components/ui/typography/title";
import { usePendingItems } from "@/hooks/items/use-pending-items";
import { useGetOrder } from "@/hooks/orders/use-get-order";

import { Icon } from "@iconify/react/dist/iconify.js";

import Image from "next/image";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useMemo } from "react";

const Page = () => {
  const stripe_id = useSearchParams().get("id");
  const total_amount = Number(useSearchParams().get("total_amount") || 0) / 100;
  const total_shipping =
    Number(useSearchParams().get("total_shipping") || 0) / 100;
  const total_tax = Number(useSearchParams().get("total_tax") || 0) / 100;
  const total_discount =
    Number(useSearchParams().get("total_discount") || 0) / 100;
  const { data, isFetched, isLoading } = useGetOrder({
    params: {
      stripe_id: stripe_id || "",
    },
  });

  console.log({ data });
  const { clear } = usePendingItems();

  useMemo(() => {
    clear();
  }, []);
  if (!data) return null;

  console.log({ data });

  return data ? (
    <>
      <div className="flex divide-x divide-dashed w-full xl:flex-row flex-col-reverse">
        <div className="flex flex-col divide-y border-y py-20  min-h-fit divide-dashed w-full h-full">
          {data?.items?.map((item, i) => (
            <ViewOrderItem
              key={`order-details-${i}`}
              className="px-5"
              item={{
                ...item.items,
                size: item.size,
                quantity: Number(item.quantity),
              }}
            />
          ))}
        </div>
        <div className="flex  flex-col pb-20 divide-y divide-dashed border-b  ">
          <div className="flex flex-col  items-center relative ">
            <Image
              src="/model/8.avif"
              alt="success"
              width={1000}
              height={1000}
              className="absolute top-0 left-0 w-full h-full object-cover  xl:opacity-0 opacity-100"
            />
            <div className="flex flex-col px-10  pb-5  w-full items-center relative xl:text-black text-white text-center py-20 xl:!bg-secondary xl:from-transparent xl:to-transparent bg-gradient-to-t  from-black/40 via-transparent to-black/40">
              <Icon
                icon="mingcute:check-fill"
                className="text-4xl text-green-500"
              />
              <Title className="text-lg">Commande réussie</Title>
              <p className="text-xs font-extralight">
                Votre commande a été passée avec succès. Vous recevrez un email
                de confirmation dans les prochaines minutes.
              </p>
              <Btn
                href={"/shop/dress"}
                size="xs"
                variant="primary"
                className="w-fit mt-4"
              >
                Retour à la boutique
              </Btn>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-5">
            <Title className="text-lg">Livraison</Title>
            <ViewAddress id="main" data={data.address} />
          </div>
          <ItemTx
            className="p-5"
            tx={{
              shipping: total_shipping,
              net: total_amount + total_shipping + total_tax,
              brut: total_amount + total_discount,
              total: total_amount,
              taxes: total_tax,
            }}
            coupon={undefined}
          />
        </div>
      </div>
    </>
  ) : !isFetched || isLoading ? (
    <Loader />
  ) : (
    <BoxError />
  );
};

export default () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
};
