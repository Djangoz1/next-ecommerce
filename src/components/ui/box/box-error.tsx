import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export const BoxError = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full flex justify-center items-center min-h-[40vh] h-full",
        className
      )}
    >
      Erreur
    </div>
  );
};
