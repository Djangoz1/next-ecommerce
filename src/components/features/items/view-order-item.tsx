import { Title } from "@/components/ui/typography/title";
import { Item } from "@/types/items";
import Image from "next/image";
import React, { useMemo } from "react";

export const ViewOrderItem = ({
  item,
}: {
  item: Item & { size: string; quantity: number };
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
    <div className="flex w-full py-5 gap-5">
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
        <p className="text-xs uppercase font-light">
          {item.abstract_description}
        </p>

        <p className="opacity-80 font-light text-xs">Taille : {item.size}</p>
        <div className="flex justify-between mt-auto w-full  font-medium gap-5 items-center">
          <p className=" font-bold text-xl">x{item.quantity}</p>
          {price.brut_price ? (
            <div className="flex items-center gap-5">
              <p className="font-light line-through text-xs">
                {price.brut_price} €
              </p>
              <p className="uppercase ">{price.price} €</p>
            </div>
          ) : (
            <>{price.price} €</>
          )}
        </div>
      </div>
    </div>
  );
};
