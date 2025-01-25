import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export const Loader = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full flex justify-center items-center min-h-[40vh] py-20 h-screen",
        className
      )}
    >
      <Icon icon="eos-icons:bubble-loading" className="text-8xl" />
    </div>
  );
};
