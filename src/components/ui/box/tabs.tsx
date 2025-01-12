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
      <div className="flex gap-5">
        {arr.map((item, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={cn(
              "cursor-pointer hover:opacity-100",
              active === index ? "underline" : "opacity-50"
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
