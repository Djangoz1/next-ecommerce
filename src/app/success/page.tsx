"use client";
import { clearPendingItems } from "@/components/features/btn-buying-action";
import { BoxError } from "@/components/ui/box/box-error";
import { Loader } from "@/components/ui/box/loader";
import { Title } from "@/components/ui/typography/title";
import { useGetOrder } from "@/hooks/orders/use-get-order";

import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, Suspense, useMemo } from "react";

const BoxIcon = ({
  icon,
  title,
  children,
  isActive,
}: {
  title: ReactNode;
  icon: string;
  children?: ReactNode;
  isActive?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 py-4 items-center w-1/4",
        isActive ? "opacity-100" : "opacity-50"
      )}
    >
      <Title className="text-sm">{title}</Title>
      <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow border">
        <Icon className="text-2xl" icon={icon} />
      </div>
      <div
        className={cn(
          "flex flex-col gap-2",
          isActive ? "opacity-100" : "opacity-0"
        )}
      >
        <p className="font-light text-xs text-center text-foreground">
          {children}
        </p>
      </div>
    </div>
  );
};

const Page = () => {
  const stripe_id = useSearchParams().get("id");

  const { data, isFetched, isLoading } = useGetOrder({
    params: {
      stripe_id: stripe_id || "",
    },
  });

  console.log({ data });

  const queryClient = useQueryClient();
  useMemo(() => {
    clearPendingItems(queryClient);
  }, []);
  if (!data) return null;

  console.log({ data });
  return data ? (
    <div className="py-20">
      <div className="flex flex-col text-center items-center justify-center pb-20 w-full">
        <Icon icon="mingcute:check-fill" className="text-4xl text-green-500" />
        <Title className="text-2xl">Commande réussie</Title>
        <p className="text-sm font-light">
          Votre commande a été passée avec succès. Vous recevrez un email de
          confirmation dans les prochaines minutes.
        </p>
      </div>
      {/* <div className="flex border-y w-full justify-evenly bg-white">
        <BoxIcon
          isActive={status === "paid"}
          title={"Production"}
          icon={"mingcute:paint-brush-ai-fill"}
        >
          En cours de production
        </BoxIcon>
        <BoxIcon
          isActive={status === "shipped"}
          title="Livraison"
          icon={"carbon:delivery"}
        >
          En cours de livraison
        </BoxIcon>
        <BoxIcon
          isActive={status === "delivered"}
          title="Réception"
          icon={"akar-icons:shipping-box-v2"}
        >
          Commande reçue
        </BoxIcon>
      </div> */}
      <div className="flex flex-col divide-y">
        {data?.items?.map((items, i) => (
          <div key={`image-${i}`} className="flex gap-5 px-3 py-5">
            <Image
              src={items[0].items.main_image}
              alt="image"
              width={100}
              height={100}
              className=""
            />
            <div className="flex flex-col">
              <Title className="text-lg">{items[0].items.name}</Title>
              <p className="text-sm">{items[0].items.abstract_description}</p>
              <span className="text-sm">QTY: {items?.length}</span>
              <span className="font-bold text-sm">
                $ {Number(items[0].items.price || 0) * items.length}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-5 px-3">
        <Title className="text-lg">Livraison</Title>
        <p className="opacity-50 font-light">
          {data.customer.name}
          <br />
          {data.customer.address}
          <br />
          {data.customer.city}
          <br />
          {data.customer.zipcode}
          <br />
          {data.customer.email}
          <br />
          {data.customer.phone}
          <br />
        </p>
      </div>
    </div>
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
