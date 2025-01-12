"use client";
import React, { useState } from "react";
import { Box } from ".";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/cn";

export const BoxCascade = ({
  className = "",
  children,
  title,
}: {
  className?: string;
  children: React.ReactNode;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box
      className="gap-10 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
      title={
        (
          <span className="flex items-center justify-between w-full">
            {title}{" "}
            <Icon
              className={cn(
                "transition-all duration-300",
                isOpen ? "rotate-180" : ""
              )}
              icon={"line-md:chevron-up"}
            />
          </span>
        ) as unknown as any
      }
    >
      {isOpen ? (
        <div className={cn("w-full", className)}>{children}</div>
      ) : (
        <></>
      )}
    </Box>
  );
};
