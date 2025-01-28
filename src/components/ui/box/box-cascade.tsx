"use client";
import React, { useState } from "react";
import { Box } from ".";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/cn";

export const BoxCascade = ({
  className = "",
  children,
  title,
  classNameBox = "",
}: {
  className?: string;
  children: React.ReactNode;
  title: string;
  classNameBox?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box
      className={cn(
        "gap-10 cursor-pointer  border-black/40 relative px-5",
        classNameBox
      )}
      onClick={() => setIsOpen(!isOpen)}
      title={title}
    >
      {isOpen ? (
        <div className={cn("w-full", className)}>{children}</div>
      ) : (
        <></>
      )}
      <span className=" absolute top-10 right-5">
        <Icon
          className={cn(
            "transition-all duration-300",
            isOpen ? "rotate-180" : ""
          )}
          icon={"line-md:chevron-up"}
        />
      </span>
    </Box>
  );
};
