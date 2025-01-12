import React from "react";
import { cn } from "@/utils/cn";
export const Title = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h6
      className={cn(
        "text-4xl tracking-wider font-info font-semibold",
        className
      )}
    >
      {children}
    </h6>
  );
};
