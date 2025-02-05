import { Item } from "@/types/items";
import { cn } from "@/utils/cn";
import React from "react";

export const ItemDiscount = ({
  item,
  className = "",
  quantity = 1,
}: {
  item: { price: Item["price"]; discount: Item["discount"] };
  className?: string;
  quantity?: number;
}) => {
  const price = Number(item.price) * quantity;
  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      {item.discount ? (
        <>
          <span className="font-medium line-through text-muted-foreground">
            {price}€
          </span>
          <span className="font-semibold">
            {(price - (Number(price) * Number(item.discount)) / 100).toFixed(2)}
            €
          </span>
        </>
      ) : null}
    </div>
  );
};
