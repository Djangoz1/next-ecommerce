import { Title } from "@/components/ui/typography/title";
import { Item } from "@/types/items";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { useMemo } from "react";
import { ItemDiscount } from "./item-discount";

export const ViewOrderItem = ({
  item,
  className = "",
}: {
  item: {
    abstract_description: string;
    name: string;
    discount: number;
    price: string;
    main_image: string;
    size: string;
    quantity: number;
    type: Item["type"];
  };
  className?: string;
}) => {
  const price = useMemo(() => {
    const res = {
      price: 0,
      brut_price: 0,
    };
    if (item.discount) {
      res.price =
        Number(item.price) * item.quantity -
        (Number(item.price) * item.quantity * item.discount) / 100;
      res.brut_price = Number(item.price) * item.quantity;
      return res;
    }
    res.price = Number(item.price) * item.quantity;
    return res;
  }, [item.discount, item.price]);
  return (
    <div className={cn("flex w-full py-5 gap-5", className)}>
      <div className="relative">
        <Image
          className="w-32"
          src={item.main_image}
          alt={item.name}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col w-full">
        <Title className="text-sm">{item.name}</Title>
        <p className="text-xs uppercase font-light max-w-3/4 w-3/4">
          {item.abstract_description}
        </p>

        <p className="opacity-80 font-light text-xs">
          {
            {
              painting: "Peinture",
              dress: "Vêtement",
              miniature: "Miniature",
            }[item.type]
          }
        </p>
        <p className="opacity-80 font-light text-xs">Taille : {item.size}</p>
        <div className="flex justify-between mt-auto w-full  font-medium gap-5 items-center">
          <p className=" font-bold text-xl">x{item.quantity}</p>
          <ItemDiscount item={item} quantity={item.quantity} />
        </div>
      </div>
    </div>
  );
};
