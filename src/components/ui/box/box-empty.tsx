import { cn } from "@/utils/cn";
import React from "react";

export const BoxEmpty = ({
  className = "",
  children = null,
  text = "Aucun résultat",
}: {
  className?: string;
  children?: React.ReactNode;
  text?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full py-40 px-20 h-full gap-5",
        className
      )}
    >
      <p className="uppercase font-medium text-muted-foreground text-sm text-center">
        {text}
      </p>
      {children}
    </div>
  );
};
