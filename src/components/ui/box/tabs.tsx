"use client";
import { cn } from "@/utils/cn";
import React, { ReactNode, useState } from "react";

export const Tabs = ({
  arr,
  className = "",
}: {
  arr: { component: ReactNode; title: string }[];
  className?: string;
}) => {
  const [active, setActive] = useState(0);
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="flex gap-1 justify-center">
        {arr.map((item, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={cn(
              "px-4  py-2 cursor-pointer border-b-2 hover:opacity-100",
              active === index
                ? " border-black"
                : "opacity-50 hover:border-black/90 border-black/10"
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="w-full">{arr[active].component}</div>
    </div>
  );
};
