import { Item } from "@/types/items";
import { cn } from "@/utils/cn";
import React from "react";

export const ItemDiscount = ({
  item,
  className = "",
}: {
  item: { price: Item["price"]; discount: Item["discount"] };
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      {item.discount ? (
        <>
          <span className="font-medium line-through text-muted-foreground">
            {item.price}€
          </span>
          <span className="font-semibold">
            {(
              Number(item.price) -
              (Number(item.price) * Number(item.discount)) / 100
            ).toFixed(2)}
            €
          </span>
        </>
      ) : null}
    </div>
  );
};
