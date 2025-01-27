"use client";
import React from "react";
import { Btn } from ".";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export const BtnMenu = ({
  arr,
}: {
  arr: { label: string; value: string }[];
}) => {
  const url = usePathname();
  return (
    <div className="flex w-full border-y">
      {arr.map((el, i) => (
        <Btn
          key={`menu-${el.value}-${i}`}
          href={el.value}
          className={cn(
            "opacity-50 w-full hover:opacity-100 py-2 text-xs rounded-none justify-center",
            url === el.value ? "opacity-100" : ""
          )}
          variant={url === el.value ? "primary" : "ghost"}
        >
          {el.label}
        </Btn>
      ))}
    </div>
  );
};
