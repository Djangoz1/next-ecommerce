"use client";
import { Title } from "@/components/ui/typography/title";
import { useApi } from "@/hooks/useApi";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export type Item = {
  abstract_description: string;
  description: string;
  discount: number;
  id: number;
  main_image: string;
  price: string;
  stock: number;
  name: string;
  type: "dress" | "miniature" | "painting";
};

const StorePage = ({}) => {
  const searchParams = useSearchParams();

  const type = searchParams.get("t") || "dress";
  const { data } = useApi({
    path: `/items?type=${type}`,
    method: "GET",
  });

  console.log({ data });
  return (
    <div className="flex flex-col w-full divide-y">
      <div className="flex flex-col relative pt-32 gap-4 items-center py-10 ">
        <Title className="xl:text-6xl">
          {
            {
              dress: "Vêtements",
              miniature: "Miniatures",
              paint: "Peintures",
            }[type]
          }
        </Title>
        <span className="text-xs uppercase font-light opacity-50">
          {data?.length} produits
        </span>
      </div>

      <div className="flex text-sm opacity-75  uppercase items-center overflow-x-auto">
        <div className="flex px-5 border-r py-2">Filtres</div>
        <Link
          className={cn(
            "px-5 h-full flex items-center justify-center",
            type === "dress" ? "bg-black text-white" : ""
          )}
          href={`/shop/women?t=dress`}
        >
          Vêtements
        </Link>
        <Link
          className={cn(
            "px-5 h-full flex items-center justify-center",

            type === "miniature" ? "bg-black text-white" : ""
          )}
          href={`/shop/women?t=miniature`}
        >
          Miniatures
        </Link>
        <Link
          href={`/shop/women?t=paint`}
          className={cn(
            "px-5 h-full flex items-center justify-center",
            type === "paint" ? "bg-black text-white" : ""
          )}
        >
          Peintures
        </Link>
      </div>
      <div className="flex flex-col p-5 xl:grid xl:grid-cols-4  w-full gap-10">
        {(data as Item[])?.map((item, index) => (
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
        ))}
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
