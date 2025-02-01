"use client";
import { ItemDiscount } from "@/components/features/items/item-discount";
import { Loader } from "@/components/ui/box/loader";
import { BtnMenu } from "@/components/ui/btn/btn-menu";
import { useGetItems } from "@/hooks/items/use-get-items";
import { Item } from "@/types/items";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const StorePage = () => {
  const type = useParams().type as Item["type"];
  const { data, isFetched, ...rest } = useGetItems({
    params: {
      type: type as Item["type"],
    },
  });

  console.log({ items: data, rest });

  return (
    <div className="flex py-20 flex-col w-full divide-y">
      <div className="flex text-sm opacity-75  uppercase items-center overflow-x-auto">
        <BtnMenu
          value={`/shop/${type}`}
          arr={[
            { label: "Vêtements", value: "/shop/dress" },
            { label: "Miniatures", value: "/shop/miniature" },
            { label: "Peintures", value: "/shop/painting" },
          ]}
        />
      </div>
      {isFetched ? (
        <div className="p-5 grid-cols-2 grid xl:grid-cols-4  w-full gap-5 xl:gap-10">
          {data?.map((item, index) => (
            <Link
              href={`/shop/${type}/${item.id}`}
              key={`item-${index}`}
              className={cn(
                "w-full relative flex flex-col gap-2 transition-all hover:scale-105",
                index === 0 || index % 5 === 0 ? "col-span-2" : ""
              )}
            >
              {item.discount ? (
                <div className="absolute top-2 right-0 w-fit h-fit px-4 py-px text-xs border border-black bg-black/50 rounded-full rounded-r-none">
                  <span className="uppercase text-white">
                    - {item.discount} %
                  </span>
                </div>
              ) : null}
              <Image
                src={item.main_image}
                alt={item.name}
                width={1200}
                height={1200}
                className="w-full h-full"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase font-medium">
                  {item.name}
                </span>
                <ItemDiscount item={item} />
                {/* <span className="text-sm text-muted-foreground">
                  {item.discount ? (
                    <>
                      <span className="line-through text-xs mr-2">
                        {Number(item.price)}€
                      </span>
                      <span>
                        {Number(item.price) -
                          (Number(item.price) * item.discount) / 100}
                      </span>
                    </>
                  ) : (
                    item.price
                  )}{" "}
                  €
                </span> */}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default StorePage;
