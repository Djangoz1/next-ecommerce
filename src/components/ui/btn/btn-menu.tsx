"use client";
import React from "react";
import { Btn } from ".";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import Link from "next/link";

export const BtnMenu = ({
  arr,
  classNameEl = "",
}: {
  arr: { label: string; value: string }[];
  classNameEl?: string;
}) => {
  const url = usePathname();
  console.log({ url });
  return (
    <div className="flex min-w-full border-y overflow-x-auto divide-x divide-black whitespace-nowrap">
      {arr.map((el, i) => (
        <Link
          key={`menu-${el.value}-${i}`}
          href={el.value}
          className={cn(
            "opacity-50 w-full hover:opacity-100 py-2 text-xs text-center uppercase font-medium rounded-none justify-center",
            url === el.value ? "opacity-100 bg-zinc-800 text-white" : "",
            classNameEl
          )}
        >
          {el.label}
        </Link>
      ))}
    </div>
  );
};
