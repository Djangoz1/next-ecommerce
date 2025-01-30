"use client";
import { Loader } from "@/components/ui/box/loader";
import { BtnMenu } from "@/components/ui/btn/btn-menu";
import { Title } from "@/components/ui/typography/title";
import { useGetItems } from "@/hooks/items/use-get-items";

import { Item } from "@/types/items";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const StorePage = ({}) => {
  const searchParams = useSearchParams();
  const type = (searchParams.get("t") as Item["type"]) || "dress";

  const { data, isFetched, ...rest } = useGetItems({
    params: {
      type,
    },
  });

  console.log({ items: data, rest });

  return (
    <div className="flex flex-col w-full divide-y">
      <div className="flex flex-col relative pt-32 gap-4 items-center py-10 ">
        <Title className="xl:text-6xl">
          {
            {
              dress: "Vêtements",
              miniature: "Miniatures",
              painting: "Peintures",
            }[type]
          }
        </Title>
        <span className="text-xs uppercase font-light opacity-50">
          {data?.length} produits
        </span>
      </div>

      <div className="flex text-sm opacity-75  uppercase items-center overflow-x-auto">
        <BtnMenu
          value={`/shop/women?t=${type}`}
          arr={[
            { label: "Vêtements", value: "/shop/women?t=dress" },
            { label: "Miniatures", value: "/shop/women?t=miniature" },
            { label: "Peintures", value: "/shop/women?t=painting" },
          ]}
        />
      </div>
      <div className="flex flex-col p-5 xl:grid xl:grid-cols-4  w-full gap-10">
        {isFetched ? (
          data?.map((item, index) => (
            <Link
              href={`/shop/women/${item.id}`}
              key={`item-${index}`}
              className="w-full flex flex-col gap-2 transition-all hover:scale-105"
            >
              <Image
                src={item.main_image}
                alt={item.name}
                width={1200}
                height={1200}
                className="w-full h-full"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm uppercase">{item.name}</span>
                <span className="text-sm opacity-50">{item.price} €</span>
              </div>
            </Link>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

const StorePageWrapper = () => (
  <Suspense fallback={<div>Loading ...</div>}>
    <StorePage />
  </Suspense>
);

export default StorePageWrapper;
