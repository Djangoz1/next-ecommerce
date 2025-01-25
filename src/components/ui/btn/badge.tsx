import { cn } from "@/utils/cn";
import React from "react";

export const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-black px-3 py-px flex text-white rounded-full  shadow text-xs font-light items-center justify-center h-fit",
        className
      )}
    >
      {children}
    </div>
  );
};
