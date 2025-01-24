"use client";
import { Title } from "@/components/ui/typography/title";
import { useApi } from "@/hooks/useApi";
import { Buying, Customer, Item } from "@/types/items";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
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
      <Title className="text-lg">{title}</Title>
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
  const { data } = useApi({
    path: "/buy",
    method: "GET",
    params: { stripe_id: stripe_id || "" },
  }) as { data: { items: (Item & { details: Buying })[]; customer: Customer } };

  const status = useMemo(() => {
    if (!data) return null;
    let status = "paid";
    for (const item of data.items) {
      if (item.details.status === "pending") {
        status = "pending";
      }
      if (item.details.status === "cancelled") {
        status = "cancelled";
      }
    }
    return status;
  }, [data]);
  if (!data) return null;
  const castArr = data?.items.reduce((acc: Item[][], item) => {
    const existingGroup = acc.find((group) => group[0]?.id === item.id);

    if (existingGroup) {
      existingGroup.push(item);
      return acc;
    }
    return [...acc, [item]];
  }, []);
  console.log({ castArr, data });
  return (
    <div className="py-20">
      <div className="flex border-y w-full justify-evenly bg-white">
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
      </div>
      <div className="flex flex-col divide-y">
        {castArr?.map((items, i) => (
          <div key={`image-${i}`} className="flex gap-5 px-3 py-5">
            <Image
              src={items[0]?.main_image}
              alt="image"
              width={100}
              height={100}
              className=""
            />
            <div className="flex flex-col">
              <Title className="text-lg">{items[0]?.name}</Title>
              <p className="text-sm">{items[0]?.abstract_description}</p>
              <span className="text-sm">QTY: {items.length}</span>
              <span className="font-bold text-sm">
                $ {Number(items[0]?.price || 0) * items.length}
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
  );
};

export default () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
};
